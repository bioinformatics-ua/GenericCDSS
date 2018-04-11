# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets, filters
from rest_framework.filters import OrderingFilter
from rest_framework.decorators import list_route
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from patients.api.serializers import PatientSerializer

from patients.models import Patient

from history.models import History


class ClinicalVariablesViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all() #WRONG
    serializer_class = PatientSerializer #WRONG
    #
    # filter_backends = [DjangoFilterBackend, OrderingFilter]
    # filter_fields = ["first_name", "last_name", "room"]
    #
    # def list(self, request, *args, **kwargs):
    #     '''
    #     Return a list of patients
    #     '''
    #     return super(PatientViewSet, self).list(request, *args, **kwargs)
    def retrieve(self, request, *args, **kwargs):
        result = {
            "results": {
                "summary":[
                {
                    "component_title": "Blood infos",
                    "content":{
                        "Blood pressure": 12,
                        "Blood type": "A",
                        "Blood things": 123
                    }
                }],
                "all_data":[
                {
                    "component_title": "Blood infos",
                    "content":{
                        "Blood pressure": 12,
                        "Blood type": "A",
                        "Blood things": 123
                    }
                },
                {
                    "component_title": "Glucose levels",
                    "content": {
                        "Glucose level": 150,
                        "GH level": "High"
                    }
                },
                {
                    "component_title": "Testosterone",
                    "content": {
                        "Testosterone level": 500
                    }
                },
                {
                    "component_title": "Blood again",
                    "content": {
                        "Blood pressure": 12,
                        "Blood type": "A",
                        "Blood things": 123,
                        "Blood sub type": "AB"
                    }
                }
            ]
            }
        }

        return Response(result)