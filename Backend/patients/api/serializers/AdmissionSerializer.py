# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from patients.models import Admission

from accounts.api.serializers import UserProfileSerializer

from patients.api.serializers import PatientSerializer

class AdmissionSerializer(serializers.ModelSerializer):
    physician       = serializers.SerializerMethodField(required=False)
    next_measure    = serializers.SerializerMethodField(required=False)
    last_measure    = serializers.SerializerMethodField(required=False)
    patient         = PatientSerializer()

    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = Admission
        fields = '__all__'

    def get_physician(self, obj):
        return obj.physician.user.get_full_name()

    def get_next_measure(self, obj):
        return obj.getNextProtocolAssignedMeasure()

    def get_last_measure(self, obj):
        return obj.getLastProtocolAssignedMeasure()