# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.conf import settings

from utils.models import Language
from constance import config

class Multilingual(models.Model):
    key           = models.CharField(max_length=150)
    content       = models.CharField(max_length=500)
    language      = models.ForeignKey(Language)

    def __unicode__(self):
        return u"%s - %s" % (self.key, self.language)

    @staticmethod
    def all():
        '''
        Returns all text for the front end, by the selected language on settings
        '''

        try: #Filter by the selected language
            language = Language.objects.get(language=config.language)
        except:
            try:#Then, try to filter by the default language
                language = Language.objects.get(language=settings.GLOBALS['LANGUAGE'])
            except: #Then, there is no language
                return []
        tmpAll = Multilingual.objects.all().filter(language=language)

        return tmpAll.order_by('content')
