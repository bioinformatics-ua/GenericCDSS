# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets, mixins, status
from rest_framework.response import Response

from history.models import History
from history.api.serilizer import HistorySerializer

class HistoryViewSet(mixins.ListModelMixin,
                     viewsets.GenericViewSet):
    """
    API for History manipulation
    """
    queryset = History.objects.none()
    serializer_class = HistorySerializer


    def get_queryset(self):
        return History.all(user=self.request.user).exclude(event=History.ACCESS)

    def list(self, request, *args, **kwargs):
        """
        Return a list of user-related history, across all the system.

        """
        return super(HistoryViewSet, self).list(request, args, kwargs)

    def __filterHistory(self, Model, pk):
        '''Internal class that handles the creation of the History  Serializer based on the object type, and its public hash.

            DEPRECATED: In favor of :class:`history.api.FilteredHistory`
        '''
        serializer = HistorySerializer(many=True, instance=History.type(Model, pk))

        return Response(serializer.data, status=status.HTTP_201_CREATED)