# coding=utf-8
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'This command will populate the db with random data to create a demo installation'

    def add_arguments(self, parser):
        parser.add_argument(
            '--force',
            action='store_true',
            dest='force',
            help='Force the deletion and the creation of the super user',
        )

    def handle(self, *args, **options):
        try:
            user = User.objects.get(username="john", email="joao.rafael.almeida@ua.pt")
            if options['force']:
                self.stdout.write("\nCleaning the old super user!\n\n")
                user.delete()
                self.stdout.write("\nCreating the new super user!\n\n")
                self.create_superUser()
                self.stdout.write("Success:The superuser was created with success!\n")
            else:
                self.stdout.write("\nERROR:The superuser was already created!\n\n")
        except:
            self.create_superUser()
            self.stdout.write("Success:The superuser was created with success!\n")

    def create_superUser(self):
        User.objects.create_superuser(username="john", email="joao.rafael.almeida@ua.pt", password="12345qwert")
