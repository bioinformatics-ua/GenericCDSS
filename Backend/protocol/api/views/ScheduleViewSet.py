# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets, filters

from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from protocol.api.serializers import ScheduleSerializer
from protocol.models import Schedule

from history.models import History

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
