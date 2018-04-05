# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from models import Patient, ClinicalVariable, CVProfile

# Register your models here.

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    pass

@admin.register(ClinicalVariable)
class ClinicalVariableAdmin(admin.ModelAdmin):
    pass

@admin.register(CVProfile)
class CVProfileAdmin(admin.ModelAdmin):
    pass
