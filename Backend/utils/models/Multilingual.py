# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from utils.models import Language

class Multilingual(models.Model):
    key           = models.CharField(max_length=150)
    content       = models.CharField(max_length=500)
    language      = models.ForeignKey(Language)

    def __unicode__(self):
        return u"%s - %s" % (self.key, self.language)