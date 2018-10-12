# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from enum import Enum

from rest_framework import serializers
from rest_framework import permissions

from protocol_element.models import ProtocolElement, PEInquiry, PEAction, PEDecision

from protocol_element.api.serializers import PolymorphicSerializer, PEInquirySerializer, PEActionSerializer, PEDecisionSerializer

class ProtocolElementSerializer(PolymorphicSerializer):
    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = ProtocolElement
        #exclude = ['id']
        fields = '__all__'

    def get_serializer_map(self):
        return {
            'PEInquiry': PEInquirySerializer,
            'PEAction': PEActionSerializer,
            'PEDecision': PEDecisionSerializer,
        }










