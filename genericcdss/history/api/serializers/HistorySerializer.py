# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from rest_framework import permissions

from history.api.serializers import GenericObjectField
from history.models import History

class HistorySerializer(serializers.ModelSerializer):
    '''
    Serializer to handle :class:`history.models.History` objects serialization/deserialization.

    This class is used by django-rest-framework to handle all object conversions, to and from json,
    while allowing in the future to change this format with any other without losing the abstraction.
    '''
    object = GenericObjectField(read_only=True)
    event = serializers.SerializerMethodField()
    object_type = serializers.SerializerMethodField()
    object_repr = serializers.SerializerMethodField()
    actor_repr = serializers.SerializerMethodField()

    class Meta:
        model = History
        exclude = ['object_id', 'authorized']
        permission_classes = [permissions.IsAuthenticated]#, TokenHasScope]

    def get_object_repr(self, obj):
        '''
        Polymorphically returns the textual representation(each object decides how to represent itself)
        '''
        return obj.obj_repr()

    def get_event(self, obj):
        '''
        Returns a textual representation of the event that ocurred over the object being logged.
        '''
        return dict(History.EVENTS)[obj.event]

    def get_object_type(self, obj):
        '''
        Returns a textual representation of the type of object, typically the class name.
        '''
        return obj.object.__class__.__name__

    def get_actor_repr(self, obj):
        '''
        Returns a textual representation of the actor playing the action.
        '''
        return obj.actor.get_full_name() or obj.actor.email
