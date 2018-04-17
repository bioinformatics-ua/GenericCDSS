# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class CVGroup(models.Model):
    title                       = models.CharField(max_length=30)
    description                 = models.CharField(max_length=100, blank=True)
    index_representation        = models.IntegerField()

    def __unicode__(self):
        return u"CV group - %s" % self.title