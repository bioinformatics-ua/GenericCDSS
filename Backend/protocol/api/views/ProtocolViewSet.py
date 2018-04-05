# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets, filters

from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from patients.api.serializers import PatientSerializer

from protocol.models import Protocol

from history.models import History

class ProtocolViewSet(viewsets.ModelViewSet):
    queryset = Protocol.objects.all()
    serializer_class = PatientSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filter_fields = ["title", "created_date"]

    def list(self, request, *args, **kwargs):
        '''
        Return a list of protocols
        '''
        return super(ProtocolViewSet, self).list(request, *args, **kwargs)