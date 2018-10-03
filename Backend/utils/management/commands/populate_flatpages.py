# coding=utf-8
from django.core.management.base import BaseCommand
from django.contrib.flatpages.models import FlatPage
from django.contrib.sites.models import Site

class Command(BaseCommand):
    help = 'This command will populate the db with random data to create a demo installation'

    def add_arguments(self, parser):
        parser.add_argument(
            '--force',
            action='store_true',
            dest='force',
            help='Force the deletion and the creation of the flat pages',
        )

    def handle(self, *args, **options):
        siteDomain = "AutoPages"
        if options['force']:
            self.stdout.write("\nCleaning the old auto flat pages!\n\n")
            self.remove_FlatPages(siteDomain)
            self.stdout.write("\nCreating new auto flat pages!\n\n")
            self.create_FlatPages(siteDomain)
        else:
            try:
                Site.objects.get(domain=siteDomain)
                self.stdout.write("\nERROR:The flat pages are already populated!\n\n")
            except:
                self.create_FlatPages(siteDomain)

    def remove_FlatPages(self, siteDomain):
        try:
            site = Site.objects.get(domain=siteDomain)
            FlatPage.objects.filter(sites=site).delete()
        except:
            self.stdout.write("\nThe auto flat pages do not exist in the system!\n\n")


    def create_FlatPages(self, siteDomain):
        try:
            site = Site.objects.get(domain=siteDomain)
        except:
            site = Site.objects.create(domain=siteDomain,
                                       name=siteDomain)
            site.save()

        FlatPage.objects.create(url="/home/",
                                title="Home",
                                content='<img src="home_wallpaper.jpg" style="width:100%; height:100%; opacity:0.5;">').sites.add(site)
        FlatPage.objects.create(url="/about/",
                                title="About",
                                content="TO DO").sites.add(site)
        FlatPage.objects.create(url="/help/",
                                title="Help",
                                content="TO DO").sites.add(site)

        self.stdout.write("Success: The flat pages populated with success!\n")