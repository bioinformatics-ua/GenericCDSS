# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

class HistoryRelated(models.Model):
    '''
    Describes an indirect relationship with the object, which makes the history relevant, not directly, but in scope.
    An example of related history, is for example, the history about a protocol task, being related with the history from a Protocol.
    It may make sense to see related history when seeing the process, but not the other way around.

    Attributes:
        :object (Model): Any model that inherits from :class:`django.models.Model`
    '''

    object_type     = models.ForeignKey(ContentType)
    object_id       = models.PositiveIntegerField()
    object          = GenericForeignKey('object_type', 'object_id')