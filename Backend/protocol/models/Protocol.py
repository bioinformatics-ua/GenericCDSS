# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from protocol.models import Schedule

class Protocol(models.Model):
    SIMPLE          = 1
    COMPLEX         = 2

    TYPES = (
        (SIMPLE, 'This is a simple protocol, which have a input, process this input and produces an output'),
        (COMPLEX, 'This is a complex protocol, which have serveral elements attached to it'),
    )

    title           = models.CharField(max_length=150, unique=True)
    description     = models.CharField(max_length=300)
    created_date    = models.DateTimeField(auto_now_add=True)
    removed         = models.BooleanField(default=False)
    type            = models.PositiveSmallIntegerField(choices=TYPES, default=SIMPLE)
    public          = models.BooleanField(default=False)
    schedules       = models.ManyToManyField(Schedule)

    def __unicode__(self):
        return self.title

    @staticmethod
    def new(title, schedules):#, description, type, public):
        protocol = Protocol.objects.create(title=title)
                                                   # description=description,
                                                   # type=type,
                                                   # public=public)
        protocol.save()
        # History todo
        for schedule in schedules:
            scheduleObj = Schedule.objects.get(time=schedule)
            protocol.schedules.add(scheduleObj)
        protocol.save()
        return protocol
