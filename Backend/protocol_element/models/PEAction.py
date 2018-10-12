# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from protocol_element.models import ProtocolElement, PENextElements

class PEAction(ProtocolElement):
    action           = models.CharField(max_length=300)
    nextElement      = models.ForeignKey(PENextElements, null=True)

    def getNextElementId(self):
        if self.nextElement:
            return self.nextElement.getNextElementId()
        return None

    @staticmethod
    def new(id, action, protocol):
        return PEAction.objects.create(action=action, internalId=id, protocol=protocol).save()

    @staticmethod
    def addNextElement(id, protocol, nextElementId):
        pe = ProtocolElement.get(type=ProtocolElement.ACTION, internalId=int(id), protocol=protocol)
        nextElement = PENextElements.new(nextElementId=int(nextElementId), protocol=protocol)
        pe.nextElement = nextElement
        pe.save()

    def execute(self):
        print "to do"

        if self.nextElement != None:
            self.nextElement.nextElement.execute()

    @staticmethod
    def all():
        '''
        Returns all action protocol elements
        '''

        tmpAll = PEAction.objects.all()

        return tmpAll.order_by('internalId')