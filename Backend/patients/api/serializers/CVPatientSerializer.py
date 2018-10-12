# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from patients.models import CVPatient

class CVPatientSerializer(serializers.ModelSerializer):
    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = CVPatient
        fields = '__all__'
        read_only_fields = ('id',)

