# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import include, url
from rest_framework import routers

from api.views import PatientViewSet

router = routers.DefaultRouter()
router.register(r'', PatientViewSet, base_name='patientview')

urlpatterns = [
    url(r'^', include(router.urls))
]
