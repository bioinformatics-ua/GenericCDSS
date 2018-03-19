# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class ClinicalVariable(models.Model):
    variable        = models.CharField(max_length=30)
    description     = models.CharField(max_length=100)