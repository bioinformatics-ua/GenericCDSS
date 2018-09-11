# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

from patients.models import Patient

from protocol.models import Protocol

from protocol_element.models import ProtocolElement, PEDecision, PEAction

class ExecutedProtocol(models.Model):
    protocol            = models.ForeignKey(Protocol)
    patient             = models.ForeignKey(Patient)
    execution_time      = models.DateTimeField(auto_now_add=True)
    elementsExecuted    = models.ManyToManyField(ProtocolElement)

    def run(self, inquiryData):
        allElements = ProtocolElement.all(protocol=self.protocol).order_by('internalId').select_subclasses()
        index = 0
        firstElementInternalId = allElements[index].internalId
        while True:
            element = allElements[index]
            self.elementsExecuted.add(element)
            if (type(element) == PEDecision):
                index = element.run(inquiryData)
            else:
                index = element.getNextElementId()

            if index == None:
                break

            #Because internal ids could start at 0 or 1 depending of the users decision
            index -= firstElementInternalId

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
    def new(protocol, patient):
        protocol = ExecutedProtocol.objects.create(protocol=protocol,
                                                   patient=patient,
                                                   execution_time=timezone.now())
        protocol.save()
        return protocol

    @staticmethod
    def getLastExecution(protocol=None, patient=None):
        '''
        Returns the last protocol execution instance
        '''
        tmpAll = ExecutedProtocol.objects.all()

        if protocol != None:
            tmpAll = tmpAll.filter(protocol=protocol)

        if patient != None:
            tmpAll = tmpAll.filter(patient=patient)

        return tmpAll.order_by('execution_time').first()

    @staticmethod
    def all(protocol=None, patient=None):
        '''
        Returns all executed protocol instances
        '''
        tmpAll = ExecutedProtocol.objects.all()

        if protocol != None:
            tmpAll = tmpAll.filter(protocol=protocol)

        if patient != None:
            tmpAll = tmpAll.filter(patient=patient)

        return tmpAll.order_by('execution_time')