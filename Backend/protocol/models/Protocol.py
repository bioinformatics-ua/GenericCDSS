# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

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

    def __unicode__(self):
        return self.title

