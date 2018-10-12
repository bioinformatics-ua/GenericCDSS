# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from protocol.models import Protocol
from protocol.api.serializers import ScheduleSerializer

from protocol_element.api.serializers import ProtocolElementSerializer
from protocol_element.models import ProtocolElement

class ProtocolSerializer(serializers.ModelSerializer):
    elements    = serializers.SerializerMethodField(required=False)
    schedules   = ScheduleSerializer(many=True)

    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = Protocol
        fields = '__all__'

    def get_elements(self, obj):
        elements = ProtocolElement.all(protocol=obj)
        return ProtocolElementSerializer(elements, many=True).data
