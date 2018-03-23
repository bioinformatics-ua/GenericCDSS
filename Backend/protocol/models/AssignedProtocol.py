# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class AssignedProtocol(models.Model):

    schedule        = models.TimeField()
    start_time      = models.DateTimeField(auto_now_add=True)
    finish_time     = models.DateTimeField(null=True)
    active          = models.BooleanField(default=True)
    hash            = models.CharField(max_length=50, unique=True)