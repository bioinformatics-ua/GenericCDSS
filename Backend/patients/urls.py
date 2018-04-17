# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import include, url
from rest_framework import routers

from api.views import PatientViewSet, PatientCVsViewSet, AdmissionViewSet

router = routers.DefaultRouter()
router.register(r'patient', PatientViewSet, base_name='patientview')
router.register(r'admission', AdmissionViewSet, base_name='admissionview')
router.register(r'clinicalvariables', PatientCVsViewSet, base_name='clinicalvariablesview')

urlpatterns = [
    url(r'^', include(router.urls))
]
