# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from datetime import datetime

from model_utils.managers import InheritanceManager

from protocol.models import Protocol

class ProtocolElement(models.Model):
    INQUIRY         = "Inquiry"
    ACTION          = "Action"
    DECISION        = "Decision"

    TYPES = (
        (INQUIRY, 'Inquiry protocol element'),
        (ACTION, 'Action protocol element'),
        (DECISION, 'Decision protocol element'),
    )

    internalId      = models.IntegerField()
    protocol        = models.ForeignKey(Protocol, related_name='elements')
    removed         = models.BooleanField(default=False)
    removed_date    = models.DateTimeField(null=True)

    objects         = InheritanceManager()

    class Meta:
        unique_together = (('internalId', 'protocol', 'removed_date'),)

    def desativate(self):
        self.removed = True
        self.removed_date = datetime.now()
        self.save()

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

        tmpAll = tmpAll.filter(removed=False)

        if protocol != None:
            tmpAll = tmpAll.filter(protocol=protocol)

        return tmpAll.order_by('internalId')

    @staticmethod
    def get(internalId, protocol, type=None):
        '''
        Returns a protocol element
        '''
        from protocol_element.models import PEInquiry, PEAction, PEDecision

        tmpAll = None
        if type:
            if type == ProtocolElement.INQUIRY:
                tmpAll = PEInquiry.all().filter(removed=False, internalId=internalId, protocol=protocol)
            if type == ProtocolElement.ACTION:
                tmpAll = PEAction.all().filter(removed=False, internalId=internalId, protocol=protocol)
            if type == ProtocolElement.DECISION:
                tmpAll = PEDecision.all().filter(removed=False, internalId=internalId, protocol=protocol)
        else:
            tmpAll = ProtocolElement.all(protocol=protocol).filter(internalId=internalId)

        if len(tmpAll) == 1:
            return tmpAll.first()
        return None

