# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

#from oauth2_provider.ext.rest_framework import TokenHasScope

from accounts.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        permission_classes = [permissions.IsAuthenticated]#, TokenHasScope]
        model = Profile
        exclude = ['id', 'user']