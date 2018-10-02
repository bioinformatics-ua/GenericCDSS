# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from protocol_element.models import PEAction
from protocol_element.api.serializers import  PENextElementsSerializer

class PEActionSerializer(serializers.ModelSerializer):
    nextElement         = serializers.SerializerMethodField(required=False)
    type                = serializers.SerializerMethodField(required=False)

    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = PEAction
        #exclude = ['id']
        fields = '__all__'

    def get_type(self, obj):
        return "Action"

    def get_nextElement(self, obj):
        if obj.nextElement:
            return str(obj.nextElement.nextElement.internalId)
        return ""