# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from patients.models import Admission

from accounts.api.serializers import UserProfileSerializer

from patients.api.serializers import PatientSerializer

class AdmissionSerializer(serializers.ModelSerializer):
    physician = UserProfileSerializer()
    patient   = PatientSerializer()

    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = Admission
        fields = '__all__'
        read_only_fields = ('id',)

