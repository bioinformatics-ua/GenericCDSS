# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from datetime import datetime

from patients.models import Patient

from protocol.models import Protocol, Time, Schedule

from protocol_element.models import ProtocolElement, PEDecision, PEAction

from accounts.models import Profile

class ExecutedProtocol(models.Model):
    ASSIGNED            = 1
    EXECUTED            = 2
    CANCELED            = 3 #todo

    STATUS = (
        (ASSIGNED, "The protocol execution is in the assigned stage"),
        (EXECUTED, "The protocol is already executed"),
        (CANCELED, "The protocol execution was canceled")
    )

    protocol            = models.ForeignKey(Protocol)
    patient             = models.ForeignKey(Patient)
    schedule            = models.ForeignKey(Schedule)
    physician           = models.ForeignKey(Profile)
    schedule_time       = models.DateTimeField()
    execution_time      = models.DateTimeField(null=True)
    elementsExecuted    = models.ManyToManyField(ProtocolElement)
    state               = models.PositiveSmallIntegerField(choices=STATUS, default=ASSIGNED)

    def run(self, inquiryData, physician):
        elementsExecutedInProtocol, actionsResult = self.protocol.run(inquiryData)
        for element in elementsExecutedInProtocol:
            self.elementsExecuted.add(element)
        self.state = ExecutedProtocol.EXECUTED
        self.execution_time = datetime.now()
        self.physician = physician
        self.save()
        return self.getResult()

    def getResult(self):
        actionsResult = []
        elementsExecuted = self.elementsExecuted.all().order_by('internalId').select_subclasses()
        counter = 1
        for element in elementsExecuted:
            if (type(element) == PEAction):
                actionsResult += [(counter, element.action)]
                counter+=1
        return actionsResult

    @staticmethod
    def new(protocol, patient, physician, last_execution=None):
        schedule_time, scheduleTitle = protocol.getNextScheduleTime(last_execution)
        scheduleObj = Schedule.objects.get(title=scheduleTitle)
        protocol = ExecutedProtocol.objects.create(protocol=protocol,
                                                   patient=patient,
                                                   schedule=scheduleObj,
                                                   physician=physician,
                                                   schedule_time=schedule_time,
                                                   state=ExecutedProtocol.ASSIGNED)
        protocol.save()
        return protocol

    @staticmethod
    def cancelAllAssigned(patient):
        '''
        Cancel the assigned protocols for the patient
        '''
        allPatientProtocols = ExecutedProtocol.all(patient=patient, state=ExecutedProtocol.ASSIGNED)
        for protocol in allPatientProtocols:
            protocol.state=ExecutedProtocol.CANCELED
            protocol.save()

    @staticmethod
    def getNextExecution(patient=None):
        '''
        Return the next protocol execution instance
        '''
        return ExecutedProtocol.all(patient=patient, state=ExecutedProtocol.ASSIGNED).first()

    @staticmethod
    def getLastExecution(protocol=None, patient=None, admissionDate=None):
        '''
        Return the last protocol execution instance
        '''
        return ExecutedProtocol.all(protocol=protocol, patient=patient, admissionDate=admissionDate, order_by='-execution_time').first()

    @staticmethod
    def all(protocol=None, patient=None, admissionDate=None, state=None, order_by=None):
        '''
        Return all executed protocol instances
        '''
        tmpAll = ExecutedProtocol.objects.all()

        if protocol != None:
            tmpAll = tmpAll.filter(protocol=protocol)

        if patient != None:
            tmpAll = tmpAll.filter(patient=patient)

        if admissionDate != None:
            tmpAll = tmpAll.filter(execution_time__gte=admissionDate)

        if state != None:
            tmpAll = tmpAll.filter(state=state)

        if order_by != None:
            return tmpAll.order_by(order_by)

        return tmpAll.order_by('-schedule_time')