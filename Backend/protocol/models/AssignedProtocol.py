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
    finish_date     = models.DateField(null=True)
    active          = models.BooleanField(default=True)

    @staticmethod
    def new(protocol, patient, schedule, start_date, end_date):
        assignedProtocol = AssignedProtocol.objects.create(protocol=protocol,
                                                           patient=patient,
                                                           schedule=schedule,
                                                           start_date=start_date,
                                                           finish_date=end_date)
        # History to do
        assignedProtocol.save()

    @staticmethod
    def all(active=True, protocol=None, patient=None, schedule=None):
        '''
        Returns all assigned protocol instances
        '''
        tmpAll = AssignedProtocol.objects.all()

        if active == True:
            tmpAll = tmpAll.filter(active=True)

        if protocol != True:
            tmpAll = tmpAll.filter(protocol=protocol)

        if patient != True:
            tmpAll = tmpAll.filter(patient=patient)

        if schedule != True:
            tmpAll = tmpAll.filter(schedule=schedule)

        return tmpAll.order_by('start_date')