# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from datetime import datetime

from protocol.models import Schedule

class Protocol(models.Model):
    SIMPLE          = 1
    COMPLEX         = 2

    TYPES = (
        (SIMPLE, 'This is a simple protocol, which have a input, process this input and produces an output'),
        (COMPLEX, 'This is a complex protocol, which have serveral elements attached to it'),
    )

    title           = models.CharField(max_length=150, unique=True)
    description     = models.CharField(max_length=300)
    created_date    = models.DateTimeField(auto_now_add=True)
    removed         = models.BooleanField(default=False)
    type            = models.PositiveSmallIntegerField(choices=TYPES, default=SIMPLE)
    public          = models.BooleanField(default=False)
    schedules       = models.ManyToManyField(Schedule)

    def __unicode__(self):
        return self.title

    @staticmethod
    def new(title, description, schedules):#, type, public):
        protocol = Protocol.objects.create(title=title,
                                           description=description)
                                                   # type=type,
                                                   # public=public)
        protocol.save()
        # History todo
        for schedule in schedules:
            scheduleObj = Schedule.objects.get(time=schedule)
            protocol.schedules.add(scheduleObj)
        protocol.save()
        return protocol

    @staticmethod
    def all():
        '''
        Returns all executed protocol instances
        '''
        tmpAll = Protocol.objects.all().filter(removed=False)

        return tmpAll.order_by('title')

    def getNextScheduleTime(self):
        '''
        Returns next schedule time
        '''
        allPossibleTimes = []
        for schedule in self.schedules.all():
            allPossibleTimes += schedule.getAllScheduleTimes()

        nextScheduleTime = None
        allPossibleTimes = sorted(allPossibleTimes)

        for timeObj in allPossibleTimes:
            if(datetime.now().time() < timeObj.time): #the time is after now
                if(nextScheduleTime):
                    if (timeObj.time < nextScheduleTime.time):
                        nextScheduleTime = timeObj
                else:
                    nextScheduleTime = timeObj

        if(nextScheduleTime == None):
            nextScheduleTime = allPossibleTimes[0]

        if(nextScheduleTime.time < datetime.now().time()): #Tomorrow
            nextSchedule = datetime.now() + datetime.timedelta(days=1)
            return nextSchedule.replace(hour=nextScheduleTime.time.hour, minute=nextScheduleTime.time.minute)
        else: #Today
            nextSchedule = datetime.now()
            return nextSchedule.replace(hour=nextScheduleTime.time.hour, minute=nextScheduleTime.time.minute)

    def run(self, inquiryData):
        from protocol_element.models import ProtocolElement, PEDecision, PEAction

        allElements = ProtocolElement.all(protocol=self).order_by('internalId').select_subclasses()
        elementsExecuted = []
        index = 0
        firstElementInternalId = allElements[index].internalId
        while True:
            element = allElements[index]
            elementsExecuted += [element]
            if (type(element) == PEDecision):
                index = element.run(inquiryData)
            else:
                index = element.getNextElementId()

            if index == None:
                break

            #Because internal ids could start at 0 or 1 depending of the users decision
            index -= firstElementInternalId

        actionsResult = []
        counter = 1
        for element in elementsExecuted:
            if (type(element) == PEAction):
                actionsResult += [(counter, element.action)]
                counter += 1

        return (elementsExecuted, actionsResult)

    def remove(self):
        self.removed = True
        self.save()