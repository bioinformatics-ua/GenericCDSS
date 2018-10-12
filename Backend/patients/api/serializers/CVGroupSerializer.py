# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from patients.models import CVGroup, ClinicalVariable

from patients.api.serializers import ClinicalVariableSerializer

class CVGroupSerializer(serializers.ModelSerializer):
    clinical_variables = serializers.SerializerMethodField(required=False)
    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = CVGroup
        fields = ('title', 'index_representation', 'clinical_variables')
        read_only_fields = ('id',)

    def get_clinical_variables(self, obj):
        clinicalVariables = ClinicalVariable.all(group=obj)
        return ClinicalVariableSerializer(clinicalVariables, many=True).data