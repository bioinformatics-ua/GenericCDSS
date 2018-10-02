# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from protocol_element.models import ProtocolElement

class PENextElements(models.Model):
    option           = models.CharField(max_length=50, null=True)
    nextElement      = models.ForeignKey(ProtocolElement)

    def getNextElementId(self):
        return self.nextElement.internalId

    @staticmethod
    def new(nextElementId, protocol, option=None):
        pe = ProtocolElement.get(internalId=nextElementId, protocol=protocol)
        nextElement = PENextElements.objects.create(option=option, nextElement=pe)
        nextElement.save()
        return nextElement