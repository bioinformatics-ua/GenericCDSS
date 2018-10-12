# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import include, url
from rest_framework import routers

from api.views import UserViewSet

router = routers.DefaultRouter()
router.register(r'', UserViewSet, base_name='userview')

urlpatterns = [
    url(r'^', include(router.urls))
]
