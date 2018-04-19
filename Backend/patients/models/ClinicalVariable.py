# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import encoding

from patients.models import Patient, CVGroup

class ClinicalVariable(models.Model):
    group                       = models.ForeignKey(CVGroup)
    variable                    = models.CharField(max_length=30)
    description                 = models.CharField(max_length=100, blank=True)
    index_representation        = models.IntegerField()
    display                     = models.BooleanField(default=True)

    def __unicode__(self):
        return u"CV Group: %s, Variable: %s" % (self.group.title, self.variable)

    @staticmethod
    def all(group=None, all=False):
        '''
        Returns all clinical variable instances
        '''
        tmpAll = ClinicalVariable.objects.all()

        if all == False:
            tmpAll = tmpAll.filter(display=True)

        if group != None:
            tmpAll = tmpAll.filter(group=group)

        return tmpAll

    @staticmethod
    def get(variable, group):
        return ClinicalVariable.all(group=group).get(variable=variable)