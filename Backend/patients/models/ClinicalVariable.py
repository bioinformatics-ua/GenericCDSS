# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import encoding

from patients.models import Patient, CVGroup

class ClinicalVariable(models.Model):
    STRING          = 'String'
    NUMERIC         = 'Numeric'
    CONDITIONAL     = 'Conditional'

    TYPES = (
        (STRING, 'String - The clinical variable can store string values'),
        (NUMERIC, 'Numeric - The clinical variable can store numeric values'),
        (CONDITIONAL, 'Conditional - The clinical variable can store one option from a list of values'),
    )

    group                       = models.ForeignKey(CVGroup)
    variable                    = models.CharField(max_length=30)
    type                        = models.CharField(max_length=30, choices=TYPES, default=STRING)
    description                 = models.CharField(max_length=100, blank=True)
    index_representation        = models.IntegerField()
    display                     = models.BooleanField(default=True)

    def __unicode__(self):
        return u"CV Group: %s, Variable: %s" % (self.group.title, self.variable)

    @staticmethod
    def new(group, variable, type, description, index_representation, options=None):
        from patients.models import CVOption

        cv = ClinicalVariable.objects.create(group=group,
                                             variable=variable,
                                             type=type,
                                             description=description,
                                             index_representation=index_representation)
        cv.save()

        if type == ClinicalVariable.CONDITIONAL:
            for option in options:
                CVOption.objects.create(variable=cv,
                                        option=option).save()

        return cv

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
