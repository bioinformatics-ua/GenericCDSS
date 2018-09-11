# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from protocol_element.models import PEInquiry
from protocol_element.api.serializers import  PENextElementsSerializer

from patients.api.serializers import ClinicalVariableSerializer

class PEInquirySerializer(serializers.ModelSerializer):
    clinicalVariable    = ClinicalVariableSerializer()
    nextElement         = serializers.SerializerMethodField(required=False)
    type                = serializers.SerializerMethodField(required=False)

    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = PEInquiry
        exclude = ['id']

    def get_type(self, obj):
        return "Inquiry"

    def get_nextElement(self, obj):
        if obj.nextElement:
            return str(obj.nextElement.nextElement.internalId)
        return ""