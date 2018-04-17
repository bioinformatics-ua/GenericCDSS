# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import detail_route

from django.contrib.flatpages.models import FlatPage

class FlatPagesView(viewsets.ViewSet):
    permission_classes = (AllowAny,)

    @detail_route(methods=['get'])
    def getAbout(self, request, *args, **kwargs):
        try:
            aboutPage = FlatPage.objects.get(title="About")
            return Response({"about": aboutPage.content})
        except:
            return Response({"about": "Error"})


    @detail_route(methods=['get'])
    def getHelp(self, request, *args, **kwargs):
        try:
            helpPage = FlatPage.objects.get(title="Help")
            return Response({"help": helpPage.content})
        except:
            return Response({"help": "Error"})


    @detail_route(methods=['get'])
    def getHome(self, request, *args, **kwargs):
        try:
            homePage = FlatPage.objects.get(title="Home")
            return Response({"home": homePage.content})
        except:
            return Response({"home": "Error"})