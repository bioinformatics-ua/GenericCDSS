# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from patients.models import ClinicalVariable

class CVOption(models.Model):
    variable            = models.ForeignKey(ClinicalVariable)
    option              = models.CharField(max_length=30)

    @staticmethod
    def getOptions(variable=None):
        tmpAll = []
        for optionObj in CVOption.objects.filter(variable=variable):
            tmpAll += [optionObj.option]
        return tmpAll