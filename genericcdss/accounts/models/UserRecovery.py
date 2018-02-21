# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

from utils.hashes import createUUID
from utils.time import nextMonth

class UserRecovery(models.Model):
    user        = models.ForeignKey(User)
    validity    = models.DateTimeField(default=nextMonth)
    hash        = models.CharField(max_length=50, default=createUUID)
    used        = models.BooleanField(default=False)

    def __unicode__(self):
        return u"Password Recovery for %s" % self.user
