# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets, filters
from rest_framework.decorators import list_route
from rest_framework.response import Response

from django.db import transaction

from patients.api.serializers import CVPatientSerializer, CVGroupSerializer, PatientSerializer

from patients.models import CVPatient, CVGroup, ClinicalVariable, Patient

from history.models import History

from itertools import groupby
import datetime

class PatientCVsViewSet(viewsets.ModelViewSet):
    queryset = Patient.all(active=True)
    serializer_class = PatientSerializer

    def retrieve(self, request, *args, **kwargs):
        patient = self.get_object()
        return self.buildResponse(patient)

    def buildResponse(self, patient):
        headers = CVGroup.objects.all()
        headerSerialized = CVGroupSerializer(headers, many=True)

        results = []
        for group in headers:
            obj = {"group": group.title}
            cvs = CVPatient.all(patient=patient, group=group)
            content = []
            cvsSplitedByDate = [list(grp) for i, grp in
                                groupby(sorted(cvs.values()), key=lambda item: item["measure_date"])]

            # These nested fors hurts my soul, but i don't know a better solution
            for cvsInThatDate in cvsSplitedByDate:
                cvToAddInResponse = {"measure_date": cvsInThatDate[0]["measure_date"].strftime("%Y-%m-%d %H:%M")}
                for cv in cvsInThatDate:
                    cvToAddInResponse[cv["variable"]] = cv["value"]
                content += [cvToAddInResponse]

            obj["content"] = content
            results += [obj]

        return Response({
            "headers": headerSerialized.data,
            "results": results
        })

    @list_route(methods=['post'])
    @transaction.atomic
    def addVariables(self, request, *args, **kwargs):
        measure_date  = datetime.datetime.now()
        group = CVGroup.objects.get(title=request.data["group"])
        patient = Patient.objects.get(id=request.data["patient"])

        for cv in request.data:
            if(cv != "group" or cv != "patient"):
                variable = cv
                value = request.data[cv]
                CVPatient.new(patient, group, variable, value, measure_date)

        return self.buildResponse(patient)