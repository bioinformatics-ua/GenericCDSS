# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from model_utils.managers import InheritanceManager

from protocol.models import Protocol

class ProtocolElement(models.Model):
    INQUIRY         = 1
    ACTION          = 2
    DECISION        = 3

    TYPES = (
        (INQUIRY, 'Inquiry protocol element'),
        (ACTION, 'Action protocol element'),
        (DECISION, 'Decision protocol element'),
    )

    internalId      = models.IntegerField()
    protocol        = models.ForeignKey(Protocol, related_name='elements')

    objects         = InheritanceManager()

    class Meta:
        unique_together = (('internalId', 'protocol'),)

    @staticmethod
    def all(protocol=None, type=None):
        '''
        Returns all protocol elements
        '''
        from protocol_element.models import PEInquiry, PEAction, PEDecision

        if type != None:
            if type == ProtocolElement.INQUIRY:
                tmpAll = PEInquiry.all()
            if type == ProtocolElement.ACTION:
                tmpAll = PEAction.all()
            if type == ProtocolElement.DECISION:
                tmpAll = PEDecision.all()
        else:
            tmpAll = ProtocolElement.objects.all()

        if protocol != None:
            tmpAll = tmpAll.filter(protocol=protocol)

        return tmpAll.order_by('internalId')

