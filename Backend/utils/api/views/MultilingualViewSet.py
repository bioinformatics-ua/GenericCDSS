# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets, filters

from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from utils.api.serializers import MultilingualSerializer
from utils.models import Multilingual

from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import detail_route

class MultilingualViewSet(viewsets.ViewSet):
    permission_classes = (AllowAny,)

    @detail_route(methods=['get'])
    def getLanguage(self, request, *args, **kwargs):
        try:
            queryset = {}
            allTerms = Multilingual.all()
            for term in allTerms:
                queryset[term.key] = term.content
            return Response(queryset)
        except:
            return "Error"
