# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class History(models.Model):
    ADD             = 1
    EDIT            = 2
    DELETE          = 3
    ACCESS          = 4
    CANCEL          = 5
    DONE            = 6
    APPROVE         = 7
    COMMENT         = 8
    RECOVER         = 9


    EVENTS = (
        (ADD, 'Add'),
        (EDIT, 'Edit'),
        (DELETE, 'Delete'),
        (ACCESS, 'Access'),
        (CANCEL, 'Cancel'),
        (DONE, 'Done'),
        (APPROVE, 'Approve'),
        (COMMENT, 'Comment'),
        (RECOVER, 'Recover')
    )

    event = models.PositiveSmallIntegerField(choices=EVENTS, default=ADD)

    @classmethod
    def new(self, event, actor, object, observations=None, authorized=None, related=None):
        pass