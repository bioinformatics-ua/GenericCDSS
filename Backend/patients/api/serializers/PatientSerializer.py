# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from patients.models import Patient


class PatientSerializer(serializers.ModelSerializer):
    fullname    = serializers.SerializerMethodField(required=False)
    fullgender  = serializers.SerializerMethodField(required=False)

    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = Patient
        fields = '__all__'
        read_only_fields = ('id', 'fullname', 'fullgender')

    def get_fullname(self, obj):
        full_name = obj.get_full_name()

        if full_name == "":
            return obj.email
        return full_name

    def get_fullgender(self, obj):
        return obj.get_full_gender()