# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from enum import Enum

from rest_framework import serializers

class PolymorphicSerializer(serializers.ModelSerializer):
    def get_serializer_map(self):
        """
        Return a dict to map class names to their respective serializer classes

        To be implemented by all PolymorphicSerializer subclasses
        """
        raise NotImplementedError

    def to_representation(self, obj):
        """
        Translate object to internal data representation

        Override to allow polymorphism
        """
        obj = obj.__class__.objects.get_subclass(id=obj.id)
        type_str = obj.__class__.__name__

        try:
            serializer = self.get_serializer_map()[type_str]
        except KeyError:
            raise ValueError('Serializer for "{}" does not exist'.format(type_str), )

        data = serializer(obj, context=self.context).to_representation(obj)

        #data['type'] = type_str
        return data

    # def to_internal_value(self, data):
    #     """
    #     Validate data and initialize primitive types
    #
    #     Override to allow polymorphism
    #     """
    #     try:
    #         type_str = data['type']
    #     except KeyError:
    #         raise serializers.ValidationError({
    #             'type': 'This field is required',
    #         })
    #
    #     try:
    #         serializer = self.get_serializer_map()[type_str]
    #     except KeyError:
    #         raise serializers.ValidationError({
    #             'type': 'Serializer for "{}" does not exist'.format(type_str),
    #         })
    #
    #     validated_data = serializer(context=self.context).to_internal_value(data)
    #     validated_data['type'] = type_str
    #     return validated_data
    #
    # def create(self, validated_data):
    #     """
    #     Translate validated data representation to object
    #
    #     Override to allow polymorphism
    #     """
    #     serializer = self.get_serializer_map()[validated_data['type']]
    #     validated_data.pop('type')
    #     return serializer(context=self.context).create(validated_data)
    #
    # def update(self, instance, validated_data):
    #     serializer = self.get_serializer_map()[validated_data['type']]
    #     validated_data.pop('type')
    #     return serializer(context=self.context).update(instance, validated_data)