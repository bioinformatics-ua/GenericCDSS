# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets, filters
from rest_framework.decorators import api_view, list_route
from rest_framework.response import Response

from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.db import transaction

from protocol.api.serializers import ProtocolSerializer, AssignedProtocolSerializer
from protocol.models import Protocol, AssignedProtocol, ExecutedProtocol

from patients.models import Patient, CVPatient

from protocol_element.api.serializers import ProtocolElementSerializer, PEInquirySerializer
from protocol_element.models import ProtocolElement, PEInquiry

from history.models import History

class ProtocolViewSet(viewsets.ModelViewSet):
    queryset = Protocol.objects.all()
    serializer_class = ProtocolSerializer

    @list_route(methods=['post'])
    @transaction.atomic
    def createProtocol(self, request):
        title = request.data.get('title', None)
        description = request.data.get('description', None)
        protocolElements = request.data.get('protocolElements', None)
        schedules = request.data.get('schedules', None)

        if (title == None or protocolElements == None or schedules == None or description == None):
            return Response({
                'error': "Invalid parameters"
            })

        protocol = Protocol.new(title=title, description=description, schedules=schedules)
        #Create elements
        for element in protocolElements:
            ProtocolElement.new(internalId=element["internalId"],
                                protocol=protocol,
                                type=element["type"],
                                elementData=element)
        #Create elements relations
        for element in protocolElements:
            if "nextElement" in element:
                ProtocolElement.createConnectionsBetweenElements(internalId=element["internalId"],
                                                                 protocol=protocol,
                                                                 type=element["type"],
                                                                 elementData=element)
        return Response({"results": ProtocolSerializer(protocol).data})

    @list_route(methods=['post'])
    @transaction.atomic
    def run(self, request):
        patientId = request.data.get('patientID', None)
        protocolId = request.data.get('protocolID', None)
        inquiryData = request.data.get('inquiryData', None)

        if(patientId == None or protocolId == None or inquiryData == None):
            return Response({
                'error': "Invalid parameters"
            })

        patient = Patient.objects.get(id=patientId)
        CVPatient.addCVSet(inquiryData, patient)

        protocolTemplate = Protocol.objects.get(id=protocolId)
        protocol = ExecutedProtocol.new(protocol=protocolTemplate, patient=patient)
        result = protocol.run(inquiryData)

        return Response({"results": result})


    @list_route(methods=['get'])
    def protocolInquiryComponents(self, request):
        patient = Patient.objects.get(id=self.request.query_params.get('patient', None))
        assignment = AssignedProtocol.getCurrentAssignment(patient)
        protocol = assignment.protocol
        elements = ProtocolElement.all(protocol=protocol, type=ProtocolElement.INQUIRY)

        return Response({"results": {
                                "Protocol": ProtocolSerializer(protocol).data,
                                "Elements": PEInquirySerializer(elements, many=True).data}})