# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import detail_route

from constance import config
from django.contrib.flatpages.models import FlatPage

class ConstanceView(viewsets.ViewSet):
    permission_classes = (AllowAny,)

    def __getFooter(self):
        try:
            return config.footer_extra
        except:
            return "Error"

    def __getAppSymbol(self):
        try:
            return config.app_symbol
        except:
            return "Error"

    def __getAppSymbolSmall(self):
        try:
            return config.app_symbol_small
        except:
            return "Error"

    def __getTitle(self):
        try:
            return config.site_name
        except:
            return "Error"

    def __getShowDefaultHome(self):
        try:
            return config.show_default_home
        except:
            return "Error"

    @detail_route(methods=['get'])
    def getSettings(self, request, *args, **kwargs):
        response = {}

        response["title"] = self.__getTitle()
        response["footer"] = self.__getFooter()
        response["appSymbol"] = self.__getAppSymbol()
        response["appSymbolSmall"] = self.__getAppSymbolSmall()
        response["showDefaultHome"] = self.__getShowDefaultHome()

        return Response(response)