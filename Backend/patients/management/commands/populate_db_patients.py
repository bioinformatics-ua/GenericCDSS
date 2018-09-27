# coding=utf-8
from django.core.management.base import BaseCommand
from patients.models import CVGroup, ClinicalVariable, Patient, CVPatient, Admission
import random
import time

class Command(BaseCommand):
    help = 'This command will populate the db with random data to create a demo installation'

    def add_arguments(self, parser):
        parser.add_argument(
            '--force',
            action='store_true',
            dest='force',
            default=False,
            help='Force the deletion and the creation of the patients',
        )
        parser.add_argument(
            '--clean',
            action='store_true',
            dest='clean',
            default=False,
            help='Delete all the information created in this script',
        )
        parser.add_argument(
            '--patientNumber',
            metavar='PatientNumber',
            type=int,
            nargs=1,
            default=50,
            help='Number of random patients to create (default 50)'
        )

    def handle(self, *args, **options):
        if options['clean']:
            self.stdout.write("\nDeleting all the data created in this script\n")
            self.deleteAll()
        else:
            self.stdout.write("\n\nManage random patients\n")
            self.managePatients(force=options['force'], patientNumber=options['patientNumber'][0])
            self.stdout.write("\nManage Clinical Variables and CVGroups\n")
            self.manageBodyMeasurements(options['force'])
            self.managePerfomedExams(options['force'])

    def deleteAll(self):
        self.stdout.write("\tDeleting data in the CVPatients\n")
        CVPatient.objects.all().delete()
        self.stdout.write("\tDeleting the CVGroup (Body measurements)\n")
        cvg = CVGroup.objects.filter(title="Body measurements")
        ClinicalVariable.objects.filter(group=cvg[0]).delete()
        cvg.delete()
        self.stdout.write("\tDeleting the CVGroup (Performed exams)\n")
        cvg = CVGroup.objects.filter(title="Performed exams")
        ClinicalVariable.objects.filter(group=cvg[0]).delete()
        cvg.delete()
        self.stdout.write("\tDeleting patients\n")
        Patient.objects.all().delete()

    def dateRandom(self, startDate, endDate, format):
        stime = time.mktime(time.strptime(startDate, format))
        etime = time.mktime(time.strptime(endDate, format))
        return time.strftime(format, time.localtime(stime + random.random() * (etime - stime)))

    def managePatients(self, force, patientNumber):
        if(Patient.objects.all().count() != 0):
            self.stdout.write("\tPatients already exist in the system\n")
            if not force:
                return None

        self.stdout.write("\tDeleting all the Patients in the system\n")
        Patient.objects.all().delete()

        self.stdout.write("\tCreating the random Patients\n")
        first_names = ('Afonso', 'Alexandre', 'André', 'Artur', 'António', 'Ângelo',
                       'Mateus', 'Matias', 'Martim', 'Miguel', 'Marco', 'Mário', 'Micael',
                       'Jaime', 'José', 'João', 'Joaquim', 'Jorge', 'Joel', 'Isaac', 'Ivo',
                       'Ezequiel', 'Adolfo', 'Ianis', 'Teodoro', 'Salomão', 'Elvis')

        last_names = ('Silva', 'Santos', 'Ferreira', 'Pereira', 'Oliveira', 'Costa',
                      'Rodrigues', 'Martins', 'Jesus', 'Sousa', 'Fernandes', 'Gonçalves',
                      'Gomes', 'Lopes', 'Marques', 'Alves', 'Almeida', 'Ribeiro', 'Pinto',
                      'Carvalho', 'Teixeira', 'Moreira', 'Correia', 'Mendes', 'Nunes', 'Soares',
                      'Vieira', 'Monteiro', 'Cardoso', 'Rocha', 'Raposo', 'Neves', 'Coelho',
                      'Cruz', 'Cunha', 'Pires', 'Ramos', 'Reis', 'Simões', 'Antunes')

        for x in range(patientNumber/2):
            fname = random.choice(first_names)
            lname = random.choice(last_names)
            Patient(first_name = fname + " " + random.choice(first_names),
                    last_name = random.choice(last_names) + " " + lname,
                    status = Patient.DISCHARGED,
                    gender = "M",
                    birthdate = self.dateRandom("1960-01-01","2000-01-01",'%Y-%m-%d'),
                    phone = "234" + str(random.randint(100,999)) + str(random.randint(100,999)),
                    email = (fname + "." + lname + "@mail.com").lower()).save()

        first_names = ('Pérola', 'Lua', 'Josiane', 'Chloe', 'Giulia', 'Perla', 'Teresa',
                       'Joana', 'Juliana', 'Júlia', 'Luísa', 'Leonor', 'Letícia', 'Sofia',
                       'Luana', 'Liliana', 'Lara', 'Maria', 'Margarida', 'Marta', 'Tânia',
                       'Matilde', 'Nádia', 'Olívia', 'Pilar', 'Rafaela', 'Rita', 'Sara')
        for x in range(patientNumber/2):
            fname = random.choice(first_names)
            lname = random.choice(last_names)
            Patient(first_name = fname + " " + random.choice(first_names),
                    last_name = random.choice(last_names) + " " + lname,
                    status = Patient.DISCHARGED,
                    gender = "F",
                    birthdate = self.dateRandom("1960-01-01","2000-01-01",'%Y-%m-%d'),
                    phone = "234" + str(random.randint(100,999)) + str(random.randint(100,999)),
                    email = fname + "." + lname + "@mail.com").save()

    def manageBodyMeasurements(self, force):
        self.stdout.write("\n\nManage body measurements!\n")
        try:
            cvg = CVGroup.objects.get(title="Body measurements")
            self.stdout.write("\tCVGroup already exist in the system (Body measurements)\n")

            ClinicalVariable.objects.get(group=cvg,
                                         variable="Weight")
            ClinicalVariable.objects.get(group=cvg,
                                         variable="Height")
            ClinicalVariable.objects.get(group=cvg,
                                         variable="Waist (cm)")
            ClinicalVariable.objects.get(group=cvg,
                                         variable="Chest (cm)")
            ClinicalVariable.objects.get(group=cvg,
                                         variable="Fat (%)")
            ClinicalVariable.objects.get(group=cvg,
                                         variable="Lean mass (kg)")
            self.stdout.write("\tAll clinical variables in the Body measurements CVGroup already exist in the system\n")

            if force:
                self.stdout.write("\tDeleting the CVGroup (Body measurements)\n")
                ClinicalVariable.objects.filter(group=cvg).delete()
                cvg.delete()
                raise
        except:
            self.stdout.write("\tCreating the CVGroup (Body measurements)\n")
            cvg = CVGroup(title="Body measurements",
                          description="Body measurements of the patient",
                          index_representation=10)
            cvg.save()

            self.stdout.write("\tCreating the Clinical Variables (Body measurements)\n")
            ClinicalVariable(group=cvg,
                             variable="Weight",
                             description="Patient's weight",
                             index_representation=1).save()
            ClinicalVariable(group=cvg,
                             variable="Height",
                             description="Patient's height",
                             index_representation=5).save()
            ClinicalVariable(group=cvg,
                             variable="Waist (cm)",
                             description="Patient's waist perimeter",
                             index_representation=10).save()
            ClinicalVariable(group=cvg,
                             variable="Chest (cm)",
                             description="Patient's chest perimeter",
                             index_representation=12).save()
            ClinicalVariable(group=cvg,
                             variable="Fat (%)",
                             description="Percent of patient's fat",
                             index_representation=15).save()
            ClinicalVariable(group=cvg,
                             variable="Lean mass (kg)",
                             description="Patient's lean mass in kilos",
                             index_representation=20).save()

            self.stdout.write("\tCreating the random data for the CVPatient (Body measurements)\n")
            for patient in Patient.objects.all():
                for bodyMeasures in range(random.randint(1, 5)):
                    measure_date = self.dateRandom("2018-01-01 0:00:00", "2018-09-01 0:00:00", '%Y-%m-%d %H:%M:%S')
                    peso = random.randint(60, 90)
                    bf = random.randint(9, 25)
                    CVPatient.new(patient=patient,
                                  group=cvg,
                                  variable="Weight",
                                  value=str(peso) + " kg",
                                  measure_date=measure_date)
                    CVPatient.new(patient=patient,
                                  group=cvg,
                                  variable="Height",
                                  value=str(random.randint(150, 200)) + " cm",
                                  measure_date=measure_date)
                    CVPatient.new(patient=patient,
                                  group=cvg,
                                  variable="Waist (cm)",
                                  value=str(random.randint(60, 99)) + " cm",
                                  measure_date=measure_date)
                    CVPatient.new(patient=patient,
                                  group=cvg,
                                  variable="Chest (cm)",
                                  value=str(random.randint(60, 99)) + " cm",
                                  measure_date=measure_date)
                    CVPatient.new(patient=patient,
                                  group=cvg,
                                  variable="Fat (%)",
                                  value=str(bf) + " %",
                                  measure_date=measure_date)
                    CVPatient.new(patient=patient,
                                  group=cvg,
                                  variable="Lean mass (kg)",
                                  value=str(peso - (peso * bf / 100)) + " kg",
                                  measure_date=measure_date)

    def managePerfomedExams(self, force):
        self.stdout.write("\n\nManage performed exams!\n")
        try:
            cvg = CVGroup.objects.get(title="Performed exams")
            self.stdout.write("\tCVGroup already exist in the system (Performed exams)\n")

            ClinicalVariable.objects.get(group=cvg,
                                         variable="Exams")
            ClinicalVariable.objects.get(group=cvg,
                                         variable="Physician")
            self.stdout.write("\tAll clinical variables in the Performed exams CVGroup already exist in the system\n")
            if force:
                self.stdout.write("\tDeleting the CVGroup (Performed exams)\n")
                ClinicalVariable.objects.filter(group=cvg).delete()
                cvg.delete()
                raise
        except:
            self.stdout.write("\tCreating the CVGroup (Performed exams)\n")
            cvg = CVGroup(title="Performed exams",
                    description="Performed exams of the patient in this institution",
                    index_representation=15)
            cvg.save()

            self.stdout.write("\tCreating the Clinical Variables (Performed exams)\n")
            ClinicalVariable(group=CVGroup.objects.get(title="Performed exams"),
                             variable="Exams",
                             description="Exam performed by the patient",
                             index_representation=1).save()
            ClinicalVariable(group=CVGroup.objects.get(title="Performed exams"),
                             variable="Physician",
                             description="Physician that performed the exam",
                             index_representation=5).save()

            self.stdout.write("\tCreating the random data for the CVPatient (Performed exams)\n")
            exams = ("A‐1‐C blood glucose test","Blood pressure", "Cholesterol test", "Dilated eye exam", "Urine test",
                     "Complete foot exam", "Gums and teeth exam", "Flu shot", "Pneumococcal vaccination")
            drs = ("Dra Joana Almeida", "Dra Ana Marques", "Dra Patricia Gomes", "Dra Raquel Ferreira", "Dra Marta Alves",
                   "Dr João Almeida", "Dr Rafael Duarte", "Dr Hugo Marques", "Dr António Pereira", "Dr Filipe Gomes")

            for patient in Patient.objects.all():
                for exames in range(random.randint(1,5)):
                    measure_date = self.dateRandom("2018-01-01 0:00:00","2018-09-01 0:00:00",'%Y-%m-%d %H:%M:%S')
                    CVPatient.new(patient=patient,
                                  group = cvg,
                                  variable = "Exams",
                                  value = random.choice(exams),
                                  measure_date = measure_date)
                    CVPatient.new(patient=patient,
                                  group = cvg,
                                  variable = "Physician",
                                  value = random.choice(drs),
                                  measure_date=measure_date)