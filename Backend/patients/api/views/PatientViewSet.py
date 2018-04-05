# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets, filters

from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from patients.api.serializers import PatientSerializer

from patients.models import Patient

from history.models import History


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filter_fields = ["first_name", "last_name", "room"]

    def list(self, request, *args, **kwargs):
        '''
        Return a list of patients
        '''
        return super(PatientViewSet, self).list(request, *args, **kwargs)