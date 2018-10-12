# coding=utf-8
from django.core.management.base import BaseCommand
from protocol.models import Protocol, ExecutedProtocol
from protocol_element.models import ProtocolElement, PEAction, PEDecision, PEInquiry, PENextElements
from patients.models import CVGroup, ClinicalVariable, Patient, CVPatient, Admission

class Command(BaseCommand):
    help = 'This command will create the Surgical Diabetic Inpatient protocol in the database'

    def handle(self, *args, **options):
        self.stdout.write("\nCleaning the Surgical Diabetic Inpatient protocol!\n\n")
        self.clean_protocol()
        self.stdout.write("\nCreating the Clinical Variables needed by this protocol!\n\n")
        self.create_cvs()
        self.stdout.write("\nCreating the Surgical Diabetic Inpatient protocol!\n\n")
        self.create_protocol()
        self.stdout.write("\nSuccess:The Surgical Diabetic Inpatient protocol was created with success!\n\n")

    def create_cvs(self):
        #todo
        self.stdout.write("\nTODO\n\n")

    def clean_protocol(self):
        try:
            protocol = Protocol.objects.get(title="Surgical Diabetic Inpatient")
            peList = ProtocolElement.objects.filter(protocol=protocol)
            for pe in peList:
                PENextElements.objects.filter(nextElement=pe).delete()
            ProtocolElement.objects.filter(protocol=protocol).delete()
            protocol.delete()
        except:
            self.stdout.write("\nThe Surgical Diabetic Inpatient protocol does not exist in the system!\n\n")

    def create_protocol(self):
        protocol = Protocol.objects.create(title="Surgical Diabetic Inpatient",
                                           description = "It should be applied to the surgical diabetic inpatient")
        protocol.save()

        #todo
        PEAction.new(id=1,
                     action="In progress",
                     protocol=protocol)
