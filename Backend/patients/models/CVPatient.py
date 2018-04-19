# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from patients.models import Patient, ClinicalVariable

class CVPatient(models.Model):
    patient         = models.ForeignKey(Patient)
    variable        = models.ForeignKey(ClinicalVariable)
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
            tmpAll = tmpAll.filter(variable__group=group)

        return tmpAll

    @staticmethod
    def new(patient, group, variable, value, measure_date):
        variable = ClinicalVariable.get(variable=variable, group=group)
        cvPatient = CVPatient.objects.create(patient=patient,
                                             variable=variable,
                                             value=value,
                                             measure_date=measure_date)
        #History to do
        cvPatient.save()