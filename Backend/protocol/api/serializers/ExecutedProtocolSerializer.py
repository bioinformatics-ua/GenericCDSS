# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from protocol.models import ExecutedProtocol


class ExecutedProtocolSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField(required=False)
    execution_time = serializers.SerializerMethodField(required=False)

    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = ExecutedProtocol
        fields = '__all__'

    def get_title(self, obj):
        return obj.protocol.title

    def get_execution_time(self, obj):
        return obj.execution_time.strftime("%Y-%m-%d %H:%M")