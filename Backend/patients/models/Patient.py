# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class Patient(models.Model):
    first_name      = models.CharField(max_length=50)
    last_name       = models.CharField(max_length=50)
    room            = models.CharField(max_length=10)
    active          = models.BooleanField(default=True)
    #... maybe more fields to do

    def __unicode__(self):
        return u"Patient %s" % self.get_full_name()

    def get_full_name(self):
        return self.first_name + " " + self.last_name

    @staticmethod
    def all(active=None):
        '''
        Returns all patient instances
        '''
        tmpAll = Patient.objects.all()

        if active != None:
            tmpAll = tmpAll.filter(active=active)

        return tmpAll