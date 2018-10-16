# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

from accounts.models import Profile

from patients.models import Patient

from protocol.models import AssignedProtocol, ExecutedProtocol

class Admission(models.Model):
    patient         = models.ForeignKey(Patient)
    physician       = models.ForeignKey(Profile, limit_choices_to={'role': Profile.PHYSICIAN})
    room            = models.CharField(max_length=10, blank=True)
    start_date      = models.DateTimeField(auto_now_add=True)
    end_date        = models.DateTimeField(null=True, blank=True)

    def __unicode__(self):
        return u"Admission %s - %s" % (self.patient, self.room)

    def discharge(self):
        '''
        Insert the admission finished date of the patient that was discharged from the hospital
        '''
        self.patient.discharge()
        self.end_date = timezone.now()
        self.save()
        ExecutedProtocol.cancelAllAssigned(patient=self.patient)

    def getLastProtocolAssignedMeasure(self):
        '''
        Retrieves when was made the last protocol measurement
        :return: datetime in string format
        '''
        lastProtocolExecution = ExecutedProtocol.getLastExecution(patient=self.patient, admissionDate=self.start_date)
        if(lastProtocolExecution):
            return lastProtocolExecution.execution_time.strftime("%Y-%m-%d %H:%M")
        return ""

    def getLastProtocolAssignedMeasurePhysician(self):
        '''
        Retrieves who made the last protocol measurement
        :return: datetime in string format
        '''
        lastProtocolExecution = ExecutedProtocol.getLastExecution(patient=self.patient, admissionDate=self.start_date)
        if(lastProtocolExecution):
            return lastProtocolExecution.physician
        return ""

    def getNextProtocolAssignedMeasure(self):
        '''
        It returns when the patient information should be measured
        :return: tuple (datetime, schedule title)
        '''
        nextExecution = ExecutedProtocol.getNextExecution(patient=self.patient)
        return (nextExecution.schedule_time.strftime("%Y-%m-%d %H:%M"), nextExecution.schedule.title)

    @staticmethod
    def new(patient, physician, room):
        admission = Admission.objects.create(patient=patient,
                                             physician=physician,
                                             room=room)
        patient.admit()
        # History to do
        admission.save()

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