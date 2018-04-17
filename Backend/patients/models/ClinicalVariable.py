# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from patients.models import Patient, CVGroup

class ClinicalVariable(models.Model):
    group                       = models.ForeignKey(CVGroup)
    variable                    = models.CharField(max_length=30)
    description                 = models.CharField(max_length=100, blank=True)
    index_representation        = models.IntegerField()

    @staticmethod
    def all(group=None):
        '''
        Returns all clinical variable instances
        '''
        tmpAll = ClinicalVariable.objects.all()

        if group != None:
            tmpAll = tmpAll.filter(group=group)

        return tmpAll
