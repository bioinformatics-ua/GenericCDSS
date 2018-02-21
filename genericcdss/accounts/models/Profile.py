# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user        = models.OneToOneField(User)

    def __unicode__(self):
        return u"User profile for %s" % self.user