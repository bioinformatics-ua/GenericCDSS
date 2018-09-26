# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from protocol.models import Protocol
from protocol.api.serializers import ScheduleSerializer

from protocol_element.api.serializers import ProtocolElementSerializer

class ProtocolSerializer(serializers.ModelSerializer):
    elements    = ProtocolElementSerializer(many=True)
    schedules   = ScheduleSerializer(many=True)

    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = Protocol
        fields = '__all__'

