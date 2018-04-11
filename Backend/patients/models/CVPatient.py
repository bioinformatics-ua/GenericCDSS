# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from patients.models import Patient, CVGroup

class CVPatient(models.Model):
    patient         = models.ForeignKey(Patient)
    group           = models.ForeignKey(CVGroup)
    variable        = models.CharField(max_length=30)
    value           = models.CharField(max_length=30)