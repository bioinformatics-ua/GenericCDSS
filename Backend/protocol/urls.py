# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import include, url
from rest_framework import routers

from api.views import ProtocolViewSet, ScheduleViewSet

router = routers.DefaultRouter()
router.register(r'protocol', ProtocolViewSet, base_name='protocolview')
router.register(r'schedule', ScheduleViewSet, base_name='scheduleview')

urlpatterns = [
    url(r'^', include(router.urls))
]
