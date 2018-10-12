# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from protocol_element.models import ProtocolElement, PENextElements
from patients.models import ClinicalVariable

class PEInquiry(ProtocolElement):
    clinicalVariable = models.ForeignKey(ClinicalVariable)
    nextElement      = models.ForeignKey(PENextElements, null=True)

    def getNextElementId(self):
        if self.nextElement:
            return self.nextElement.getNextElementId()
        return None

    @staticmethod
    def new(id, clinicalVariable, protocol):
        cv = ClinicalVariable.objects.get(variable=clinicalVariable)
        return PEInquiry.objects.create(clinicalVariable=cv, internalId=id, protocol=protocol).save()

    @staticmethod
    def addNextElement(id, protocol, nextElementId):
        pe = ProtocolElement.get(type=ProtocolElement.INQUIRY,internalId=int(id), protocol=protocol)
        nextElement = PENextElements.new(nextElementId=int(nextElementId), protocol=protocol)
        pe.nextElement = nextElement
        pe.save()

    @staticmethod
    def all():
        '''
        Returns all inquiry protocol elements
        '''

        tmpAll = PEInquiry.objects.all()

        return tmpAll.order_by('internalId')