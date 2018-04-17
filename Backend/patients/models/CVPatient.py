# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from patients.models import Patient, CVGroup

class CVPatient(models.Model):
    patient         = models.ForeignKey(Patient)
    group           = models.ForeignKey(CVGroup)
    variable        = models.CharField(max_length=30)
    value           = models.CharField(max_length=30)
    measure_date    = models.DateTimeField()

    @staticmethod
    def all(patient=None, group=None):
        '''
        Returns all clinical variable instances
        '''
        tmpAll = CVPatient.objects.all()

        if patient != None:
            tmpAll = tmpAll.filter(patient=patient)

        if group != None:
            tmpAll = tmpAll.filter(group=group)

        return tmpAll

    @staticmethod
    def new(patient, group, variable, value, measure_date):
        cvPatient = CVPatient.objects.create(patient=patient,
                                             group=group,
                                             variable=variable,
                                             value=value,
                                             measure_date=measure_date)
        #History to do
        cvPatient.save()