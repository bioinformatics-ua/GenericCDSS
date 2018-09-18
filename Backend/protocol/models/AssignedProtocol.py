# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from patients.models import Patient

from protocol.models import Protocol, Schedule

class AssignedProtocol(models.Model):
    protocol        = models.ForeignKey(Protocol)
    patient         = models.ForeignKey(Patient)
    schedule        = models.ForeignKey(Schedule)
    start_date      = models.DateField()
    end_date        = models.DateField(null=True)
    active          = models.BooleanField(default=True)


    @staticmethod
    def new(protocol, patient, schedule, start_date):
        assignedProtocol = AssignedProtocol.objects.create(protocol=protocol,
                                                           patient=patient,
                                                           schedule=schedule,
                                                           start_date=start_date)
        # History todo
        assignedProtocol.save()

    @staticmethod
    def getCurrentAssignment(patient):
        tmpAll = AssignedProtocol.all(patient=patient).filter(end_date__isnull=True)

        #Calculate which is the next protocol consedering the schedule
        #todo, only necessary when exist more than one protocol assigned to a patient

        return tmpAll.order_by('start_date')[0]

    @staticmethod
    def all(active=True, protocol=None, patient=None, schedule=None):
        '''
        Returns all assigned protocol instances
        '''
        tmpAll = AssignedProtocol.objects.all()

        if active == True:
            tmpAll = tmpAll.filter(active=True)

        if protocol != None:
            tmpAll = tmpAll.filter(protocol=protocol)

        if patient != None:
            tmpAll = tmpAll.filter(patient=patient)

        if schedule != None:
            tmpAll = tmpAll.filter(schedule=schedule)

        return tmpAll.order_by('start_date')