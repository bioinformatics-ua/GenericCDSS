# coding=utf-8
from django.core.management.base import BaseCommand
from protocol.models import Protocol, ExecutedProtocol
from protocol_element.models import ProtocolElement, PEAction, PEDecision, PEInquiry, PENextElements
from patients.models import CVGroup, ClinicalVariable, Patient, CVPatient, Admission

import random
from datetime import datetime

class Command(BaseCommand):
    help = 'This command will populate the db with random data to create a demo installation'

    def handle(self, *args, **options):
        #Hypoglycemia
        self.clean_hipoglicemia()
        self.create_hipoglicemia()
        self.stdout.write("\nSuccess:The Hypoglycemia protocol was created with success!\n\n")

    def clean_hipoglicemia(self):
        # CVGroup.objects.get(title="Endocrinological data").delete()
        # ClinicalVariable.objects.get(variable="Blood Glucose").delete()
        # ClinicalVariable.objects.get(variable="Diet").delete()
        # Protocol.objects.get(title="Hypoglycemia").delete()

        #Re do
        CVGroup.objects.all().delete()
        ClinicalVariable.objects.all().delete()
        Protocol.objects.all().delete()
        PEAction.objects.all().delete()
        PEDecision.objects.all().delete()
        PEInquiry.objects.all().delete()
        PENextElements.objects.all().delete()
        ProtocolElement.objects.all().delete()



    def create_hipoglicemia(self):
        CVGroup(title="Endocrinological data",
                description="Patient endocrinological data",
                index_representation=5).save()
        ClinicalVariable(group=CVGroup.objects.get(title="Endocrinological data"),
                         variable="Blood Glucose",
                         description="Patient Blood Glucose",
                         index_representation=1).save()
        ClinicalVariable(group=CVGroup.objects.get(title="Endocrinological data"),
                         variable="Diet",
                         description="Patient Diet",
                         index_representation=5).save()

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
                                   nextElements={True:9,False:10})
        PEDecision.addNextElements(id=7,
                                   nextElements={True: 8, False: 11})
        PEDecision.addNextElements(id=4,
                                   nextElements={True:5,False:6})
        PEDecision.addNextElements(id=3,
                                   nextElements={True:4,False:7})
        PEInquiry.addNextElement(id=2,
                                 nextElementId=3)
        PEInquiry.addNextElement(id=1,
                                 nextElementId=2)
