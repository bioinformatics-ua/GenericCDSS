# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from patients.models import Patient

from protocol.models import Protocol

class ExecutedProtocol(models.Model):
    protocol        = models.ForeignKey(Protocol)
    patient         = models.ForeignKey(Patient)
    execution_time  = models.DateTimeField(auto_now_add=True)

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