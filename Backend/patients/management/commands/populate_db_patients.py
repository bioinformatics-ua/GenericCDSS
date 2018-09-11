# coding=utf-8
from django.core.management.base import BaseCommand
from patients.models import CVGroup, ClinicalVariable, Patient, CVPatient, Admission
import random
import time

class Command(BaseCommand):
    help = 'This command will populate the db with random data to create a demo installation'

    def handle(self, *args, **options):
        if CVGroup.objects.all().count() != 0:
            self.stdout.write("\nERROR:The CVGroup are already populated!\n\n")
        else:
            self.create_CVGroups()
            self.stdout.write("Success:The CVGroup populated with success!\n")

        if ClinicalVariable.objects.all().count() != 0:
            self.stdout.write("\nERROR:The ClinicalVariable are already populated!\n\n")
        else:
            self.create_ClinicalVariable()
            self.stdout.write("Success:The ClinicalVariable populated with success!\n")

        if Patient.objects.all().count() != 0:
            self.stdout.write("\nERROR:The Patient are already populated!\n\n")
        else:
            self.create_Patient()
            self.stdout.write("Success:The Patient populated with success!\n")

        if CVPatient.objects.all().count() != 0:
            self.stdout.write("\nERROR:The CVPatient are already populated!\n\n")
        else:
            self.create_CVPatient()
            self.stdout.write("Success:The CVPatient populated with success!\n")

    def create_CVGroups(self):
        CVGroup(title = "Dados endocrinológicos",
                description = "Dados endocrinológicos do paciente",
                index_representation = 5).save()
        CVGroup(title="Medidas corporais",
                description="Medidas corporais do paciente",
                index_representation=1).save()
        CVGroup(title="Exames realizados",
                description="Exames realizados pelo paciente neste hospital",
                index_representation=10).save()

    def create_ClinicalVariable(self):
        ClinicalVariable(group = CVGroup.objects.get(title = "Dados endocrinológicos"),
                         variable = "Glicemia",
                         description = "Glicemia do paciente",
                         index_representation = 1).save()
        ClinicalVariable(group = CVGroup.objects.get(title = "Medidas corporais"),
                         variable = "Peso",
                         description = "Peso do paciente",
                         index_representation = 1).save()
        ClinicalVariable(group = CVGroup.objects.get(title = "Medidas corporais"),
                         variable = "Altura",
                         description = "Altura do paciente",
                         index_representation = 5).save()
        ClinicalVariable(group = CVGroup.objects.get(title = "Medidas corporais"),
                         variable = "Cintura",
                         description = "Perimetro de cintura do paciente",
                         index_representation = 10).save()
        ClinicalVariable(group = CVGroup.objects.get(title = "Medidas corporais"),
                         variable = "Gordura (%)",
                         description = "Percentual de gordura do paciente",
                         index_representation = 15).save()
        ClinicalVariable(group = CVGroup.objects.get(title = "Medidas corporais"),
                         variable = "Massa magra",
                         description = "Massa magra em kilos do paciente",
                         index_representation = 20).save()
        ClinicalVariable(group = CVGroup.objects.get(title = "Exames realizados"),
                         variable = "Exame",
                         description = "Exame realizado pelo paciente",
                         index_representation = 1).save()
        ClinicalVariable(group = CVGroup.objects.get(title = "Exames realizados"),
                         variable = "Médico",
                         description = "Médico que realizou o exame",
                         index_representation = 5).save()

    def dateRandom(self, startDate, endDate, format):
        stime = time.mktime(time.strptime(startDate, format))
        etime = time.mktime(time.strptime(endDate, format))
        return time.strftime(format, time.localtime(stime + random.random() * (etime - stime)))

    def create_Patient(self):
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


        for x in range(25):
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
        for x in range(25):
            fname = random.choice(first_names)
            lname = random.choice(last_names)
            Patient(first_name = fname + " " + random.choice(first_names),
                    last_name = random.choice(last_names) + " " + lname,
                    status = Patient.DISCHARGED,
                    gender = "F",
                    birthdate = self.dateRandom("1960-01-01","2000-01-01",'%Y-%m-%d'),
                    phone = "234" + str(random.randint(100,999)) + str(random.randint(100,999)),
                    email = fname + "." + lname + "@mail.com").save()

    def create_CVPatient(self):
        exams = ('Abdominoscopia', 'Abreugrafia', 'Adenograma', 'Toracocentese', 'Tonometria',
                 'Antibiograma', 'Anuscopia', 'Gasometria arterial', 'Glicosímetro', 'Glicosúria', 'Teste de Allen',
                 'Teste de Coombs', 'Teste de ácido nucleico', 'Teste de Ham', 'Teste de Dix-Hallpike', 'Teste do suor',
                 'Teste de Papanicolau', 'Teste do pezinho', 'Teste VDRL', 'Tipagem sanguínea')
        drs = ("Dra Joana Almeida", "Dra Ana Marques", "Dra Patricia Gomes", "Dra Raquel Ferreira", "Dra Marta Alves",
               "Dr João Almeida", "Dr Rafael Duarte", "Dr Hugo Marques", "Dr António Pereira", "Dr Filipe Gomes")

        for patientID in range(1,Patient.objects.all().count()):
            for bodyMeasures in range(random.randint(1,5)):
                measure_date = self.dateRandom("2018-01-01 0:00:00","2018-04-01 0:00:00",'%Y-%m-%d %H:%M:%S')
                peso = random.randint(60,90)
                bf = random.randint(9,25)
                CVPatient.new(patient = Patient.objects.get(id=patientID),
                              group = CVGroup.objects.get(title="Medidas corporais"),
                              variable = "Peso",
                              value = str(peso) + " kg",
                              measure_date = measure_date)
                CVPatient.new(patient = Patient.objects.get(id=patientID),
                              group = CVGroup.objects.get(title="Medidas corporais"),
                              variable = "Altura",
                              value = str(random.randint(150,200)) + " cm",
                              measure_date = measure_date)
                CVPatient.new(patient = Patient.objects.get(id=patientID),
                              group = CVGroup.objects.get(title="Medidas corporais"),
                              variable = "Cintura",
                              value = str(random.randint(60,99)) + " cm",
                              measure_date = measure_date)
                CVPatient.new(patient = Patient.objects.get(id=patientID),
                              group = CVGroup.objects.get(title="Medidas corporais"),
                              variable = "Gordura (%)",
                              value = str(bf) + " %",
                              measure_date = measure_date)
                CVPatient.new(patient = Patient.objects.get(id=patientID),
                              group = CVGroup.objects.get(title="Medidas corporais"),
                              variable = "Massa magra",
                              value = str(peso - (peso * bf/100)) + " kg",
                              measure_date = measure_date)

            for exames in range(random.randint(1,5)):
                measure_date = self.dateRandom("2018-01-01 0:00:00","2018-04-01 0:00:00",'%Y-%m-%d %H:%M:%S')
                CVPatient.new(patient = Patient.objects.get(id=patientID),
                              group = CVGroup.objects.get(title="Exames realizados"),
                              variable = "Exame",
                              value = random.choice(exams),
                              measure_date = measure_date)
                CVPatient.new(patient = Patient.objects.get(id=patientID),
                              group = CVGroup.objects.get(title="Exames realizados"),
                              variable = "Médico",
                              value = random.choice(drs),
                              measure_date=measure_date)

            for diab in range(random.randint(10,20)):
                measure_date = self.dateRandom("2018-01-01 0:00:00","2018-04-01 0:00:00",'%Y-%m-%d %H:%M:%S')
                CVPatient.new(patient = Patient.objects.get(id=patientID),
                              group = CVGroup.objects.get(title="Dados endocrinológicos"),
                              variable = "Glicemia",
                              value = random.randint(100,300),
                              measure_date = measure_date)
