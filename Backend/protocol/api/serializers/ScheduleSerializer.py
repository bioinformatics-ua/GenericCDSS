# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from protocol.models import Schedule


class ScheduleSerializer(serializers.ModelSerializer):
    hoursMinutes = serializers.SerializerMethodField(required=False)

    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = Schedule
        fields = '__all__'
        read_only_fields = ("hoursMinutes",)

    def get_hoursMinutes(self, obj):
        return obj.time.strftime("%H:%M")