# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

from accounts.models import Profile

from patients.models import Patient

class Admission(models.Model):
    patient         = models.ForeignKey(Patient)
    physician       = models.ForeignKey(Profile, limit_choices_to={'role': Profile.PHYSICIAN})
    start_date      = models.DateTimeField(auto_now_add=True)
    end_date        = models.DateTimeField(null=True, blank=True)

    def discharge(self):
        self.end_date = timezone.now()
        self.save()

    @staticmethod
    def all(active=None):
        '''
        Returns all admission instances
        '''
        tmpAll = Admission.objects.all()

        if active == True:
            tmpAll = tmpAll.filter(end_date__isnull=True)

        return tmpAll.order_by('start_date')

    @staticmethod
    def dischargePatient(patient):
        admission = Admission.getLatestAdmission(patient)
        admission.discharge()

    @staticmethod
    def getLatestAdmission(patient):
        listOfActiveAdmissionsFromPatient = Admission.all(active=True).filter(patient=patient)
        #this should be one (TO DO something to ensure that in the future)
        return listOfActiveAdmissionsFromPatient[0]