# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from accounts.api.serializers import UserSerializer

from accounts.models import Profile

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = Profile
        exclude = ['id']