# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from patients.models import ClinicalVariable, CVOption

class ClinicalVariableSerializer(serializers.ModelSerializer):
    options    = serializers.SerializerMethodField(required=False)

    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = ClinicalVariable
        fields = ('variable', 'index_representation', 'type', 'options')
        read_only_fields = ('id',)

    def get_options(self, obj):
        if obj.type == ClinicalVariable.CONDITIONAL:
            return CVOption.getOptions(variable=obj)
        return []