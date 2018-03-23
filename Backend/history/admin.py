# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin


from models import History, HistoryRelated

@admin.register(History)
class HistoryAdmin(admin.ModelAdmin):
    pass

@admin.register(HistoryRelated)
class HistoryRelatedAdmin(admin.ModelAdmin):
    pass
