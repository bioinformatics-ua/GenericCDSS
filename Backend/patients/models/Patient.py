# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class Patient(models.Model):
    first_name      = models.CharField(max_length=30)
    #...