# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import detail_route

from constance import config

class ConstanceView(viewsets.ViewSet):
    permission_classes = (AllowAny,)

    @detail_route(methods=['get'])
    def getFooter(self, request, *args, **kwargs):
        try:
            return Response({"footer": config.footer_extra})
        except:
            return Response({"footer": "Error"})

    @detail_route(methods=['get'])
    def getHeader(self, request, *args, **kwargs):
        try:
            return Response({"appSymbol": config.app_symbol})
        except:
            return Response({"appSymbol": "Error"})