# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets, filters

from patients.api.serializers import ClinicalVariableSerializer
from patients.models import ClinicalVariable

class ClinicalVariableViewSet(viewsets.ModelViewSet):
    queryset = ClinicalVariable.all()
    serializer_class = ClinicalVariableSerializer