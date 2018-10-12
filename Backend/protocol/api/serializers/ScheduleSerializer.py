# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from protocol.models import Schedule


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = Schedule
        fields = ("id", "title")