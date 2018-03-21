# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.apps import apps

from rest_framework import filters, generics
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from history.models import History
from history.api.serializers import HistorySerializer

class FilteredHistoryListView(generics.ListAPIView):
    '''
    Listing API view that handles filtering the generic history, based on a set of parameters.
    '''
    queryset = History.objects.none()
    serializer_class = HistorySerializer
    filter_backends = [DjangoFilterBackend] #(filters.DjangoFilterBackend, AliasOrderingFilter)
    ordering_fields = ('event', 'date', 'actor')
    ordering_map = { }

    # map of possible history filters
    type_map = {
        #'process': 'process.Process',
        #'request': 'process.Request',
        'to': 'do',
    }

    def get_queryset(self):
        """
            Retrieves the proper object to filter the history by
        """
        kwargs = self.request.parser_context['kwargs']

        mdl = kwargs['model']
        pk = kwargs['pk']

        try:
            ObjModel = apps.get_model(self.type_map[mdl])

            return History.type(ObjModel, pk, related=True).exclude(event=History.ACCESS)

        except KeyError:
            return Response({'error': 'No type of object %s' %mdl})