# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class Language(models.Model):
    language      = models.CharField(max_length=2)

    def __unicode__(self):
        return u"%s" % self.language