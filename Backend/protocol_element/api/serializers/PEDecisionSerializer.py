# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from patients.api.serializers import ClinicalVariableSerializer

from protocol_element.api.serializers import  PENextElementsSerializer
from protocol_element.models import PEDecision

class PEDecisionSerializer(serializers.ModelSerializer):
    clinicalVariable    = ClinicalVariableSerializer()
    nextElement         = serializers.SerializerMethodField(required=False)
    type                = serializers.SerializerMethodField(required=False)

    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = PEDecision
        #exclude = ['id']
        fields = '__all__'

    def get_type(self, obj):
        return "Decision"

    def get_nextElement(self, obj):
        string = ""
        for element in obj.nextElement.all():
            string += element.option + ":" + str(element.nextElement.internalId) + ";"
        return string[:-1]

