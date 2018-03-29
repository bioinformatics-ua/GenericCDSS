# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import include, url

from utils.api.views import ConstanceView

urlpatterns = [
    url(r'^footer', ConstanceView.as_view({'get':'getFooter'}), name='footerview'),
    url(r'^header', ConstanceView.as_view({'get':'getHeader'}), name='headerview')
    #url(r'^something', ConstanceView.as_view({'get':'getSomething'}), name='somethingview')
]