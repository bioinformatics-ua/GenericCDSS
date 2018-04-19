"""genericcdss URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings

admin.site.site_header = settings.ADMIN_CONSOLE_NAME

urlpatterns = [
    url(r'^jet/', include('jet.urls', 'jet')),
    url(r'^jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),

    url(r'^api-auth/', include('rest_framework.urls')),

    url(r'^pages/', include('django.contrib.flatpages.urls')),

    #Api
    url(r'^api/accounts/', include('accounts.urls')),
    url(r'^api/patients/', include('patients.urls')),
    url(r'^api/protocols/', include('protocol.urls')),
    url(r'^api/utils/', include('utils.urls')),
    #...

    #Admin
    url(r'^', admin.site.urls)
]
