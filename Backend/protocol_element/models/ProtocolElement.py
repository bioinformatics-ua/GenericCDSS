# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from model_utils.managers import InheritanceManager

from protocol.models import Protocol

class ProtocolElement(models.Model):
    INQUIRY         = "inquiry"
    ACTION          = "action"
    DECISION        = "decision"

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
    def new(internalId, protocol, type, elementData):
        '''
        Creates a new protocol element depending of its type
        '''
        from protocol_element.models import PEInquiry, PEAction, PEDecision

        if type != None:
            # History todo
            if type == ProtocolElement.INQUIRY:
                PEInquiry.new(id=internalId,
                              clinicalVariable=elementData["clinicalVariable"]["variable"],
                              protocol=protocol)
            if type == ProtocolElement.DECISION:
                PEDecision.new(id=internalId,
                               clinicalVariable=elementData["clinicalVariable"]["variable"],
                               condition=elementData["condition"],
                               protocol=protocol)
            if type == ProtocolElement.ACTION:
                PEAction.new(id=internalId,
                             action=elementData["action"],
                             protocol=protocol)
    @staticmethod
    def createConnectionsBetweenElements(internalId, protocol, type, elementData):
        '''
        Creates the connections between the protocol elements
        '''
        from protocol_element.models import PEInquiry, PEAction, PEDecision

        if type != None:
            # History todo
            if type == ProtocolElement.INQUIRY:
                PEInquiry.addNextElement(id=internalId,
                                         protocol=protocol,
                                         nextElementId=elementData["nextElement"])
            if type == ProtocolElement.DECISION:
                PEDecision.addNextElements(id=internalId,
                                           protocol=protocol,
                                           nextElements=PEDecision.dealWithOptions(conditionString=elementData["nextElement"],
                                                                                   conditionType=elementData["condition"]))
            if type == ProtocolElement.ACTION:
                PEAction.addNextElement(id=internalId,
                                        protocol=protocol,
                                        nextElementId=elementData["nextElement"])

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

