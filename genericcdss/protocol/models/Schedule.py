# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class Schedule(models.Model):
    time            = models.TimeField()
    removed         = models.BooleanField(default=False)