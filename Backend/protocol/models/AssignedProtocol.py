# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from patients.models import Patient

from protocol.models import Protocol

class AssignedProtocol(models.Model):
    SIMPLE          = 1
    MULTI           = 2

    EXECUTION_TYPES = (
        (SIMPLE,    "The assigned protocol will execute only one time"),
        (MULTI,     "The assigned protocol will be executed multiple times")
    )

    protocol        = models.ForeignKey(Protocol)
    patient         = models.ForeignKey(Patient)
    schedule        = models.TimeField()
    start_date      = models.DateTimeField(auto_now_add=True)
    finish_date     = models.DateTimeField(null=True)
    active          = models.BooleanField(default=True)
    hash            = models.CharField(max_length=50, unique=True)
    exec_type       = models.PositiveSmallIntegerField(choices=EXECUTION_TYPES, default=SIMPLE)

    #def all