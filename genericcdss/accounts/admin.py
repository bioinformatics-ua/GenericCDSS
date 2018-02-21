# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from models import Profile, UserRecovery

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    pass

@admin.register(UserRecovery)
class RecoveryAdmin(admin.ModelAdmin):
    pass
