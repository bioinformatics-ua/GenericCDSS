# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets, filters
from rest_framework.decorators import list_route
from rest_framework import generics

from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from protocol.api.serializers import ExecutedProtocolSerializer
from protocol.models import ExecutedProtocol

from patients.models import Patient

from history.models import History

class ExecutedProtocolViewSet(viewsets.ModelViewSet):
    queryset = ExecutedProtocol.all(state=ExecutedProtocol.EXECUTED)
    serializer_class = ExecutedProtocolSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filter_fields = ["patient"]
