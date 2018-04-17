# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from models import Patient, ClinicalVariable, CVGroup, CVPatient, Admission

# Register your models here.

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "active")

@admin.register(ClinicalVariable)
class ClinicalVariableAdmin(admin.ModelAdmin):
    list_display = ("group", "variable", "description", "index_representation")

@admin.register(CVGroup)
class CVGroupAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "index_representation")

@admin.register(CVPatient)
class CVPatientAdmin(admin.ModelAdmin):
    list_display = ("patient", "group", "variable", "value")

@admin.register(Admission)
class AdmissionAdmin(admin.ModelAdmin):
    pass#list_display = ("patient", "physician", "variable", "value")

