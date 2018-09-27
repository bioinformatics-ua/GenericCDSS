# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from protocol.models import AssignedProtocol


class AssignedProtocolSerializer(serializers.ModelSerializer):
    pass
#     title = serializers.SerializerMethodField(required=False)
#     schedule = serializers.SerializerMethodField(required=False)
#
#     class Meta:
#         permission_classes = [permissions.IsAuthenticated]
#         model = AssignedProtocol
#         fields = '__all__'
#
#     def get_title(self, obj):
#         return obj.protocol.title
#
#     def get_schedule(self, obj):
#         return obj.schedule.time.strftime("%H:%M")