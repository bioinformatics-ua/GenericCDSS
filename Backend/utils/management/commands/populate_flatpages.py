# coding=utf-8
from django.core.management.base import BaseCommand
from django.contrib.flatpages.models import FlatPage
from django.contrib.sites.models import Site

class Command(BaseCommand):
    help = 'This command will populate the db with random data to create a demo installation'

    def add_arguments(self, parser):
        parser.add_argument(
            '-fpf',
            action='store_true',
            dest='flatpages_force',
            help='Force the delete and creation the flat pages',
        )

    def handle(self, *args, **options):
        siteDomain = "AutoPages"
        if options['flatpages_force']:
            self.remove_FlatPages(siteDomain)
            self.create_FlatPages(siteDomain)
        else:
            if FlatPage.objects.all().count() != 0:
                self.stdout.write("\nERROR:The flat pages are already populated!\n\n")
            else:
                self.create_FlatPages(siteDomain)

    def remove_FlatPages(self, siteDomain):
        try:
            site = Site.objects.get(domain=siteDomain)
        except:
            site = None
        if site != None:
            for entry in FlatPage.objects.all().filter(sites=site):
                entry.delete()

    def create_FlatPages(self, siteDomain):
        try:
            site = Site.objects.get(domain=siteDomain)
        except:
            site = Site.objects.create(domain=siteDomain,
                                       name=siteDomain).save()

        FlatPage.objects.create(url="/home/",
                                title="Home",
                                content='<center><img src="home_wallpaper.jpg" style="width:100%;opacity:0.5;"><center>').sites.add(site)
        FlatPage.objects.create(url="/about/",
                                title="About",
                                content="TO DO").sites.add(site)
        FlatPage.objects.create(url="/help/",
                                title="Help",
                                content="TO DO").sites.add(site)

        self.stdout.write("Success: The flat pages  populated with success!\n")