# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets, filters
from rest_framework.decorators import list_route
from rest_framework import generics

from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from protocol.api.serializers import AssignedProtocolSerializer
from protocol.models import AssignedProtocol

from patients.models import Patient

from history.models import History

class AssignedProtocolViewSet(viewsets.ModelViewSet):
    queryset = AssignedProtocol.all()
    serializer_class = AssignedProtocolSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filter_fields = ["patient"]
