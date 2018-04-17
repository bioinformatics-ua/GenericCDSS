# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets, filters

from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from patients.api.serializers import AdmissionSerializer

from patients.models import Admission

from history.models import History

class AdmissionViewSet(viewsets.ModelViewSet):
    queryset = Admission.all()
    serializer_class = AdmissionSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filter_fields = ["physician", "patient", "start_date"]

    def list(self, request, *args, **kwargs):
        '''
        Return a list of patients admited in the hospital and all these informations
        '''
        self.queryset = Admission.all(active=True)
        return super(AdmissionViewSet, self).list(request, *args, **kwargs)