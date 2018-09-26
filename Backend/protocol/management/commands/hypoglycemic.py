# coding=utf-8
from django.core.management.base import BaseCommand
from protocol.models import Protocol, ExecutedProtocol, Schedule, Time
from protocol_element.models import ProtocolElement, PEAction, PEDecision, PEInquiry, PENextElements
from patients.models import CVGroup, ClinicalVariable, Patient, CVPatient, Admission

from datetime import datetime, timedelta

class Command(BaseCommand):
    help = 'This command will create the hypoglycemia protocol in the database'

    def handle(self, *args, **options):
        self.stdout.write("\nCleaning the Hypoglycemia protocol!\n\n")
        self.clean_protocol()
        self.stdout.write("\nCreating the Clinical Variables needed by this protocol!\n\n")
        self.create_cvs()
        self.stdout.write("\nCreating the Hypoglycemia protocol!\n\n")
        self.create_protocol()
        self.stdout.write("\nCreating the schedules for the Hypoglycemia protocol!\n\n")
        self.create_schedules()
        self.stdout.write("\nSuccess:The Hypoglycemia protocol was created with success!\n\n")

    def create_cvs(self):
        try:
            CVGroup.objects.get(title="Endocrinological data")
        except:
            CVGroup(title="Endocrinological data",
                    description="Patient endocrinological data",
                    index_representation=5).save()

        try:
            ClinicalVariable.objects.get(group=CVGroup.objects.get(title="Endocrinological data"),
                                          variable="Blood Glucose",
                                          description="Patient Blood Glucose")
        except:
            ClinicalVariable(group=CVGroup.objects.get(title="Endocrinological data"),
                             variable="Blood Glucose",
                             description="Patient Blood Glucose",
                             index_representation=1).save()

        try:
            ClinicalVariable.objects.get(group=CVGroup.objects.get(title="Endocrinological data"),
                                          variable="Diet",
                                          description="Patient Diet")
        except:
            ClinicalVariable(group=CVGroup.objects.get(title="Endocrinological data"),
                             variable="Diet",
                             description="Patient Diet",
                             index_representation=5).save()

    def clean_protocol(self):
        try:
            protocol = Protocol.objects.get(title="Hypoglycemia")
            peList = ProtocolElement.objects.filter(protocol=protocol)
            for pe in peList:
                PENextElements.objects.filter(nextElement=pe).delete()
            ProtocolElement.objects.filter(protocol=protocol).delete()
            protocol.delete()
        except:
            self.stdout.write("\nThe Hypoglycemia protocol does not exist in the system!\n\n")

    def datetime_range(self, start, end, delta):
        current = start
        while current < end:
            yield current
            current += delta

    def create_schedules(self):
        protocol = Protocol.objects.get(title="Hypoglycemia")
        schedule = Schedule.objects.create(title="Every 15 minutes")
        schedule.save()
        intervalTimes = [dt.strftime('%H:%M') for dt in self.datetime_range(datetime(2018, 9, 1, 0), datetime(2018, 9, 1, 23, 59), timedelta(minutes=15))]
        for time in intervalTimes:
            timeToAdd = Time.objects.create(time=time)
            timeToAdd.save()
            schedule.time.add(timeToAdd)
        protocol.schedules.add(schedule)


    def create_protocol(self):
        protocol = Protocol.objects.create(title="Hypoglycemia",
                                           description = "Performance in hypoglycemia")
        protocol.save()

        PEInquiry.new(id=1,
                      clinicalVariable="Blood Glucose",
                      protocol=protocol)
        PEInquiry.new(id=2,
                      clinicalVariable="Diet",
                      protocol=protocol)
        PEDecision.new(id=3,
                       clinicalVariable="Blood Glucose",
                       condition="<50",
                       protocol=protocol)
        PEDecision.new(id=4,
                       clinicalVariable="Diet",
                       condition="=zero",
                       protocol=protocol)
        PEAction.new(id=5,
                     action="Given half of a 30% IV glucose ampoule and glucose serum 5%",
                     protocol=protocol)
        PEAction.new(id=6,
                     action="Given two sugar package to the patient",
                     protocol=protocol)
        PEDecision.new(id=7,
                       clinicalVariable="Blood Glucose",
                       condition="<70",
                       protocol=protocol)
        PEDecision.new(id=8,
                       clinicalVariable="Diet",
                       condition="=zero",
                       protocol=protocol)
        PEAction.new(id=9,
                     action="Give one 30% IV glucose ampoule and glucose serum 5%",
                     protocol=protocol)
        PEAction.new(id=10,
                     action="Given one sugar package to the patient",
                     protocol=protocol)
        PEAction.new(id=11,
                     action="Inform Endocrinologist",
                     protocol=protocol)

        PEDecision.addNextElements(id=8,
                                   protocol=protocol,
                                   nextElements={True: 9, False: 10})
        PEDecision.addNextElements(id=7,
                                   protocol=protocol,
                                   nextElements={True: 8, False: 11})
        PEDecision.addNextElements(id=4,
                                   protocol=protocol,
                                   nextElements={True: 5, False: 6})
        PEDecision.addNextElements(id=3,
                                   protocol=protocol,
                                   nextElements={True: 4, False: 7})
        PEInquiry.addNextElement(id=2,
                                 protocol=protocol,
                                 nextElementId=3)
        PEInquiry.addNextElement(id=1,
                                 protocol=protocol,
                                 nextElementId=2)
