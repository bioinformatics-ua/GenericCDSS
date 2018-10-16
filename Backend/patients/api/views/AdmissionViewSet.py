# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets, filters
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response

from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.db import transaction
from django.utils import timezone

from patients.api.serializers import AdmissionSerializer
from patients.models import Admission, Patient

from accounts.models import Profile

from protocol.models import ExecutedProtocol, Protocol, Schedule

from history.models import History

import dateutil.parser

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

    @list_route(methods=['post'])
    @transaction.atomic
    def new(self, request, *args, **kwargs):
        '''
        Admission of a patient registed in the system and all the assigned protocols.
        '''
        #Create admission
        patient  = Patient.objects.get(id=request.data.get('patientID'))
        physician = Profile.objects.get(user=request.user)
        Admission.new(patient=patient,
                      physician=physician,
                      room=request.data.get('room'))
        #Assign protocols
        selectedProtocols  = request.data.get('seletedProtocols') #For now it is only one
        for selectedProtocol in selectedProtocols:
            protocol = Protocol.objects.get(id=selectedProtocol.get("id"))
            ExecutedProtocol.new(protocol=protocol, patient=patient, physician=physician)

        self.queryset = Admission.all(active=True)
        return super(AdmissionViewSet, self).list(request, *args, **kwargs)

    @list_route(methods=['post'])
    @transaction.atomic
    def discharge(self, request, *args, **kwargs):
        patientID = request.data.get('patientID', None)

        if patientID != None:
            patient = Patient.objects.get(id=patientID)
            Admission.dischargePatient(patient)

            return Response({
                'success': True
            })

        return Response({
            'error': "The patient was not found"
        })