# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    NURSE           = 1
    PHYSICIAN       = 2
    ADMINISTRATOR   = 3

    ROLES = (
        (NURSE, 'This user is a nurse'),
        (PHYSICIAN, 'This user is a physician'),
        (ADMINISTRATOR, 'This user is a administrator'),
    )

    user        = models.OneToOneField(User)
    role        = models.PositiveSmallIntegerField(choices=ROLES, default=NURSE)

    def __unicode__(self):
        return u"User profile for %s" % self.user