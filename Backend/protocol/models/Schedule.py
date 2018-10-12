# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from protocol.models import Time

class Schedule(models.Model):
    title           = models.CharField(max_length=150, unique=True)
    time            = models.ManyToManyField(Time)
    removed         = models.BooleanField(default=False)

    def __unicode__(self):
        return self.title

    def getAllScheduleTimes(self):
        allPossibleTimes = []
        for time in self.time.all():
            allPossibleTimes += [(time, self.title)]
        return allPossibleTimes