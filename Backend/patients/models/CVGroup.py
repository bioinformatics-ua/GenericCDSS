# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class CVGroup(models.Model):
    title                       = models.CharField(max_length=30)
    description                 = models.CharField(max_length=100, blank=True)
    index_representation        = models.IntegerField()
    display                     = models.BooleanField(default=True)

    def __unicode__(self):
        return u"CV group - %s" % self.title

    @staticmethod
    def all(all=False):
        '''
        Returns all clinical variable group instances
        '''
        tmpAll = CVGroup.objects.all()

        if all == False:
            tmpAll = tmpAll.filter(display=True)
        return tmpAll