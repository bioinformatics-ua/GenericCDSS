# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class Time(models.Model):
    time            = models.TimeField()

    def __unicode__(self):
        return self.time.strftime("%H:%M")