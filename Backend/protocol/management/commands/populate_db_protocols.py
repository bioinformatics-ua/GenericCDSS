# coding=utf-8
from django.core.management.base import BaseCommand
from protocol.models import AssignedProtocol, Protocol, Schedule

import random
from datetime import datetime

class Command(BaseCommand):
    help = 'This command will populate the db with random data to create a demo installation'

    def handle(self, *args, **options):
        if Protocol.objects.all().count() != 0:
            self.stdout.write("\nERROR:The Protocol are already populated!\n\n")
        else:
            self.create_Protocol()
            self.stdout.write("Success:The Protocol populated with success!\n")

        if Schedule.objects.all().count() != 0:
            self.stdout.write("\nERROR:The Schedule are already populated!\n\n")
        else:
            self.create_Schedule()
            self.stdout.write("Success:The Schedule populated with success!\n")

        if AssignedProtocol.objects.all().count() != 0:
            self.stdout.write("\nERROR:The AssignedProtocol are already populated!\n\n")
        else:
            self.create_AssignedProtocol()
            self.stdout.write("Success:The AssignedProtocol populated with success!\n")

    def create_Protocol(self):
        Protocol.objects.create(title = "Atuação no doente diabético internado",
                                description = "Atuação no doente diabético internado").save()
        # Protocol.objects.create(title = "Atuação na hipoglicemia",
        #                         description = "Atuação na hipoglicemia").save()
        Protocol.objects.create(title = "Atuação no doente diabético cirúrgico",
                                description = "Atuação no doente diabético cirúrgico").save()
        Protocol.objects.create(title = "Insulina de perfusão endovenosa contínua",
                                description = "Insulina de perfusão endovenosa contínua").save()
        # Protocol.objects.create(title = "Protocolo para prodecimentos médicos ou cirúrgicos com omissão de uma refeição",
        #                         description = "Protocolo para prodecimentos médicos ou cirúrgicos com omissão de uma refeição").save()
        # Protocol.objects.create(title = "Atuação em situação de cetoacidose e síndrome hiperglicemia hiperosmolar (adultos)",
        #                         description = "Atuação em situação de cetoacidose e síndrome hiperglicemia hiperosmolar (adultos)").save()
        # Protocol.objects.create(title = "Atuação em situação de cetoacidose diabética (crianças e adolescentes)",
        #                         description = "Atuação em situação de cetoacidose diabética (crianças e adolescentes)").save()
        # Protocol.objects.create(title = "Protocolo diabetes e gravidez",
        #                         description = "Protocolo diabetes e gravidez").save()

    def create_Schedule(self):
        for hour in range(24):
            Schedule.objects.create(time = datetime.strptime(str(hour) + ":00:00", '%H:%M:%S')).save()

    def create_AssignedProtocol(self):
        pass