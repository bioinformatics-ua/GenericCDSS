# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets, filters
from rest_framework.filters import OrderingFilter
from rest_framework.decorators import list_route
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend
from django.db import transaction

from patients.api.serializers import PatientSerializer

from patients.models import Patient, Admission

from history.models import History

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.get_queryset().order_by('id')
    serializer_class = PatientSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filter_fields = ["first_name", "last_name"]

    def list(self, request, *args, **kwargs):
        '''
        Return a list of active patients
        '''
        return super(PatientViewSet, self).list(request, *args, **kwargs)

    @list_route(methods=['get'])
    def listAdmitted(self, request, *args, **kwargs):
        '''
        Return a list of active patients that are admitted in the hospital
        '''
        self.queryset = Patient.all(status=Patient.ADMITTED)
        return super(PatientViewSet, self).list(request, *args, **kwargs)

    @list_route(methods=['get'])
    def listDischarged(self, request, *args, **kwargs):
        '''
        Return a list of active patients that are discharged from the hospital
        '''
        self.queryset = Patient.all(status=Patient.DISCHARGED)
        return super(PatientViewSet, self).list(request, *args, **kwargs)

