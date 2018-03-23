# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import transaction
from django.contrib.auth import login

from rest_framework import serializers
from rest_framework import permissions

#from oauth2_provider.ext.rest_framework import TokenHasScope

from accounts.models import Profile
from accounts.api.serializers import ProfileSerializer

class UserSerializer(serializers.ModelSerializer):
    fullname = serializers.SerializerMethodField(required=False)
    last_login = serializers.SerializerMethodField(required=False)
    profile = ProfileSerializer()

    class Meta:
        permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]#, TokenHasScope]
        model = User
        fields = ('username', 'first_name', 'last_name', 'fullname', 'email', 'last_login', 'is_staff', 'id', 'profile')
        read_only_fields = ('id', 'fullname', 'last_login', 'is_staff')

    def get_fullname(self, obj):
        full_name = obj.get_full_name()

        if full_name == "":
            return obj.email
        return full_name

    def get_last_login(self, obj):
        if isinstance(obj.last_login, basestring):
            return obj.last_login
        elif obj.last_login:
            return obj.last_login.strftime("%Y-%m-%d %H:%M")
        return None

    @transaction.atomic
    def create(self, validated_data):
        '''
        This handles the custom user creation, serializating validated data from the web services input
        into the proper object, plus also inserting profile information, all in the same serialization.
        '''
        profile_data = None
        validated_data['is_active'] = False

        try:
            profile_data = validated_data.pop('profile')
        except KeyError:
            pass

        user = User.objects.create(**validated_data)

        # create profile data
        if profile_data:
            try:
                profile_instance = user.profile
                serializer = ProfileSerializer(profile_instance, partial=True)
                serializer.update(profile_instance, profile_data)
            except Profile.DoesNotExist:
                Profile.objects.create(user=user, **profile_data)

        return user

    @transaction.atomic
    def update(self, instance, validated_data):
        '''
        This handles the custom user update, serializating validated data from the web services input
        into the proper object, plus also updating profile information, all in the same serialization.
        '''
        profile_data = None

        try:
            profile_data = validated_data.pop('profile')
        except KeyError:
            pass

        if profile_data:
            p_instance = instance.profile
            serializer = ProfileSerializer(p_instance, partial=True)
            serializer.update(p_instance, profile_data)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        return instance