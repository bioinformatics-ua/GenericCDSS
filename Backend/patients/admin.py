# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from models import Patient, ClinicalVariable, CVGroup, CVPatient, Admission, CVOption

# Register your models here.

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ("id", "first_name", "last_name", "active", "status")

@admin.register(ClinicalVariable)
class ClinicalVariableAdmin(admin.ModelAdmin):
    list_display = ("group", "variable", "type", "description", "index_representation")

@admin.register(CVGroup)
class CVGroupAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "index_representation")

@admin.register(CVPatient)
class CVPatientAdmin(admin.ModelAdmin):
    list_display = ("patient", "variable", "value")

@admin.register(CVOption)
class CVOptionAdmin(admin.ModelAdmin):
    list_display = ("variable", "option")

@admin.register(Admission)
class AdmissionAdmin(admin.ModelAdmin):
    pass#list_display = ("patient", "physician", "variable", "value")

