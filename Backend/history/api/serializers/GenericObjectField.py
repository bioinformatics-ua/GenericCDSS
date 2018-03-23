# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers

class GenericObjectField(serializers.RelatedField):
    '''
    A custom field to use for the `object` generic relationship.
    '''

    def to_representation(self, value):
        '''
        Serialize objects to a simple textual representation.
        '''
        try:
            return value.rpr()
        except:
            try:
                return str(value.hash)
            except:
                return "DUMMY"
