# coding=utf-8
from django.core.management.base import BaseCommand
from protocol.models import Protocol, ExecutedProtocol, Schedule, Time
from protocol_element.models import ProtocolElement, PEAction, PEDecision, PEInquiry, PENextElements
from patients.models import CVGroup, ClinicalVariable, Patient, CVPatient, Admission

class Command(BaseCommand):
    help = 'This command will create the hypoglycemia protocol in the database'

    def handle(self, *args, **options):
        self.stdout.write("\nClean all protocols in the system\n\n")
        for protocol in Protocol.objects.all():
            peList = ProtocolElement.objects.filter(protocol=protocol)
            for pe in peList:
                PENextElements.objects.filter(nextElement=pe).delete()
            ProtocolElement.objects.filter(protocol=protocol).delete()
            protocol.delete()
        Schedule.objects.all().delete()
        Time.objects.all().delete()