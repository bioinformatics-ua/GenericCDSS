# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from protocol_element.models import ProtocolElement, PENextElements
from patients.models import ClinicalVariable

import operator

class PEDecision(ProtocolElement):
    clinicalVariable = models.ForeignKey(ClinicalVariable)
    condition        = models.CharField(max_length=150)
    nextElement      = models.ManyToManyField(PENextElements)

    operation = {
        "<": operator.lt,
        ">": operator.gt,
        "=": operator.eq
    }

    def run(self, inquiryData):
        cvData = inquiryData[self.clinicalVariable.variable]
        result = self.operation[self.condition[0]](cvData, self.condition[1:])
        nextElementOptions = self.nextElement.all()
        for nextElement in nextElementOptions:
            if nextElement.option == str(result):
                return nextElement.getNextElementId()
        return None

    @staticmethod
    def new(id, clinicalVariable, protocol, condition):
        cv = ClinicalVariable.objects.get(variable=clinicalVariable)
        decision = PEDecision.objects.create(clinicalVariable=cv, condition=condition, internalId=id, protocol=protocol)
        return decision.save()

    @staticmethod
    def addNextElements(id, protocol, nextElements):
        pe = PEDecision.objects.get(internalId=int(id), protocol=protocol)
        for option, id in nextElements.iteritems():
            nextElement = PENextElements.new(option=option, nextElementId=int(id), protocol=protocol)
            pe.nextElement.add(nextElement)
        pe.save()

    @staticmethod
    def dealWithOptions(conditionString, conditionType):
        nextElementOptions = {}
        #Condition with true or false output
        if(conditionType[0] in PEDecision.operation):
            conditions = conditionString.split(";")
            for condition in conditions:
                splitedCondition = condition.split(":")
                print splitedCondition
                nextElementOptions[splitedCondition[0] == True] = splitedCondition[1]
        #elif switch todo
        return nextElementOptions

    @staticmethod
    def all():
        '''
        Returns all decision protocol elements
        '''

        tmpAll = PEDecision.objects.all()

        return tmpAll.order_by('internalId')