# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from protocol.models import AssignedProtocol, Protocol, Schedule, ExecutedProtocol

# Register your models here.

@admin.register(Protocol)
class ProtocolAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "created_date", "removed")

@admin.register(AssignedProtocol)
class AssignedProtocolAdmin(admin.ModelAdmin):
    list_display = ("protocol", "patient", "schedule", "start_date", "end_date", "active")

@admin.register(ExecutedProtocol)
class ExecutedProtocolAdmin(admin.ModelAdmin):
    list_display = ("protocol", "patient", "execution_time")

@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ("time", "removed")
