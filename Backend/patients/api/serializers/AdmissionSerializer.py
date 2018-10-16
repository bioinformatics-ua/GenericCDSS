# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from patients.models import Admission

from accounts.api.serializers import UserProfileSerializer

from patients.api.serializers import PatientSerializer

class AdmissionSerializer(serializers.ModelSerializer):
    admission_physician         = serializers.SerializerMethodField(required=False)
    last_measure_physician      = serializers.SerializerMethodField(required=False)
    next_measure                = serializers.SerializerMethodField(required=False)
    last_measure                = serializers.SerializerMethodField(required=False)
    #protocol_id     = serializers.SerializerMethodField(required=False)
    patient                     = PatientSerializer()

    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = Admission
        fields = '__all__'

    def get_admission_physician(self, obj):
        return obj.physician.getFullName()

    def get_last_measure_physician(self, obj):
        if(obj.getLastProtocolAssignedMeasurePhysician() != ""):
            return obj.getLastProtocolAssignedMeasurePhysician().getFullName()
        return obj.physician.getFullName()

    def get_next_measure(self, obj):
        nextExecution, nextScheduleTitle = obj.getNextProtocolAssignedMeasure()
        return nextExecution + " - " + nextScheduleTitle

    def get_last_measure(self, obj):
        return obj.getLastProtocolAssignedMeasure()