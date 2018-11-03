# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from utils.models import Multilingual


class MultilingualSerializer(serializers.ModelSerializer):
    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = Multilingual
        fields = ("key", "content")