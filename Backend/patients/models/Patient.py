# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class Patient(models.Model):
    ADMITTED        = 1
    DISCHARGED      = 2

    STATUS = (
        (ADMITTED, 'This patient was admitted to the hospital'),
        (DISCHARGED, 'This patient was discharged from hospital'),
    )

    GENDER_OPTIONS = (
        ('M', 'Male'),
        ('F', 'Female'),
    )

    code            = models.CharField(max_length=20, blank=True) #To connect in the future to an EHR using HL7
    first_name      = models.CharField(max_length=50)
    last_name       = models.CharField(max_length=50)
    active          = models.BooleanField(default=True)
    status          = models.PositiveSmallIntegerField(choices=STATUS, default=ADMITTED)
    gender          = models.CharField(max_length=1, choices=GENDER_OPTIONS)
    birthdate       = models.DateField()
    phone           = models.CharField(max_length=20, blank=True)
    email           = models.CharField(max_length=50, blank=True)
    #... maybe more fields to do

    def __unicode__(self):
        return u"Patient %s" % self.get_full_name()

    def get_full_name(self):
        return self.first_name + " " + self.last_name

    def get_full_gender(self): #Change this to be multilingual
        if(self.gender.lower() == 'm'):
            return "Masculino"

        if(self.gender.lower() == 'f'):
            return "Feminino"

    def discharge(self):
        '''
        Discharges the patient from the hospital
        '''
        # History to do
        self.status = Patient.DISCHARGED
        self.save()

    def admit(self):
        '''
        Patient admission in the hospital
        '''
        # History to do
        self.status = Patient.ADMITTED
        self.save()

    @staticmethod
    def all(active=None, status=None):
        '''
        Returns all patient instances
        '''
        tmpAll = Patient.objects.all()

        if active != None:
            tmpAll = tmpAll.filter(active=active)
        else:
            tmpAll = tmpAll.filter(active=True)

        if status != None:
            tmpAll = tmpAll.filter(status=status)

        return tmpAll
