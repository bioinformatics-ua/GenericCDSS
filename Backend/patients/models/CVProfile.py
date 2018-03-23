# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class CVProfile(models.Model):
    title       = models.CharField(max_length=30)
    description = models.CharField(max_length=100)