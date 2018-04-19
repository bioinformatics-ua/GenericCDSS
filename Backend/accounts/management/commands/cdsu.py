# coding=utf-8
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'This command will populate the db with random data to create a demo installation'

    def handle(self, *args, **options):
        if User.objects.all().count() != 0:
            self.stdout.write("\nERROR:The superuser was already created!\n\n")
        else:
            self.create_superUser()
            self.stdout.write("Success:The superuser was created with success!\n")

    def create_superUser(self):
        User.objects.create_superuser(username="john", email="joao.rafael.almeida@ua.pt", password="12345qwert")
