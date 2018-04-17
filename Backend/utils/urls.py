# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import include, url

from utils.api.views import ConstanceView, FlatPagesView

urlpatterns = [
    url(r'^footer', ConstanceView.as_view({'get':'getFooter'}), name='footerview'),
    url(r'^header', ConstanceView.as_view({'get':'getHeader'}), name='headerview'),
    url(r'^about', FlatPagesView.as_view({'get':'getAbout'}), name='aboutview'),
    url(r'^help', FlatPagesView.as_view({'get':'getHelp'}), name='helpview'),
    url(r'^home', FlatPagesView.as_view({'get':'getHome'}), name='homeview'),
]