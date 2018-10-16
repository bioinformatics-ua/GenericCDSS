# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from protocol.models import ExecutedProtocol

from patients.models import Admission


class ExecutedProtocolSerializer(serializers.ModelSerializer):
    title                       = serializers.SerializerMethodField(required=False)
    description                 = serializers.SerializerMethodField(required=False)
    execution_time              = serializers.SerializerMethodField(required=False)
    admission_physician         = serializers.SerializerMethodField(required=False)
    last_measure_physician      = serializers.SerializerMethodField(required=False)

    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = ExecutedProtocol
        fields = '__all__'

    def get_title(self, obj):
        return obj.protocol.title

    def get_description(self, obj):
        return obj.protocol.description

    def get_execution_time(self, obj):
        if(obj.execution_time):
            return obj.execution_time.strftime("%Y-%m-%d %H:%M")
        return ""

    def get_admission_physician(self, obj):
        return Admission.getLatestAdmission(obj.patient).physician.getFullName()

    def get_last_measure_physician(self, obj):
        if(obj.physician):
            return obj.physician.getFullName()
        return ""