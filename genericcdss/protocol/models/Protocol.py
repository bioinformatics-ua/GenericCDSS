# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class Protocol(models.Model):

    title           = models.CharField(max_length=150, unique=True)
    description     = models.CharField(max_length=300)
    created_date    = models.DateTimeField(auto_now_add=True)
    removed         = models.BooleanField(default=False)
    hash            = models.CharField(max_length=50, unique=True)