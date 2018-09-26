# coding=utf-8
from django.core.management.base import BaseCommand
from protocol.models import Protocol, ExecutedProtocol
from protocol_element.models import ProtocolElement, PEAction, PEDecision, PEInquiry, PENextElements
from patients.models import CVGroup, ClinicalVariable, Patient, CVPatient, Admission

class Command(BaseCommand):
    help = 'This command will create the hypoglycemia protocol in the database'

    def handle(self, *args, **options):
        self.stdout.write("\nCleaning the Hypoglycemia protocol!\n\n")
        self.clean_protocol()
        self.stdout.write("\nCreating the Clinical Variables needed by this protocol!\n\n")
        self.create_cvs()
        self.stdout.write("\nCreating the Hypoglycemia protocol!\n\n")
        self.create_protocol()
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
                       condition="<80",
                       protocol=protocol)
        PEAction.new(id=4,
                     action="Scheduling todo",
                     protocol=protocol)
        PEDecision.new(id=5,
                       clinicalVariable="Blood Glucose",
                       condition="<50",
                       protocol=protocol)
        PEDecision.new(id=6,
                       clinicalVariable="Diet",
                       condition="=zero",
                       protocol=protocol)
        PEAction.new(id=7,
                     action="Given half of a 30% IV glucose ampoule and glucose serum 5%",
                     protocol=protocol)
        PEAction.new(id=8,
                     action="Given two sugar package to the patient",
                     protocol=protocol)
        PEDecision.new(id=9,
                       clinicalVariable="Blood Glucose",
                       condition="<70",
                       protocol=protocol)
        PEDecision.new(id=10,
                       clinicalVariable="Diet",
                       condition="=zero",
                       protocol=protocol)
        PEAction.new(id=11,
                     action="Give one 30% IV glucose ampoule and glucose serum 5%",
                     protocol=protocol)
        PEAction.new(id=12,
                     action="Given one sugar package to the patient",
                     protocol=protocol)
        PEAction.new(id=13,
                     action="Inform Endocrinologist",
                     protocol=protocol)

        PEDecision.addNextElements(id=10,
                                   protocol=protocol,
                                   nextElements={True:11,False:12})
        PEDecision.addNextElements(id=9,
                                   protocol=protocol,
                                   nextElements={True: 10, False: 13})
        PEDecision.addNextElements(id=6,
                                   protocol=protocol,
                                   nextElements={True:7,False:8})
        PEDecision.addNextElements(id=5,
                                   protocol=protocol,
                                   nextElements={True:6,False:9})
        PEDecision.addNextElements(id=3,
                                   protocol=protocol,
                                   nextElements={True:4,False:13})
        PEInquiry.addNextElement(id=2,
                                 protocol=protocol,
                                 nextElementId=3)
        PEInquiry.addNextElement(id=1,
                                 protocol=protocol,
                                 nextElementId=2)
        #Change this
        PEAction.addNextElement(id=4,
                                protocol=protocol,
                                nextElementId=5)
