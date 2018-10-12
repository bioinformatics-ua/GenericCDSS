# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.db.models import Q
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from history.models import HistoryRelated

class History(models.Model):
    '''
    Describes all actions executed over the system.

    Each lines represents semantically every possible action over the system. basing it in three parameters, `event`,
    `actor` and `object`.
    This takes in consideration each instance is an action `event` made by the `actor` over a `object`.

    The `object` is a generic foreign key to any model in the system (Workflow, Task, Process, etc), any model is valid.

    Attributes:
        :event (smallint): Event realized over the generic object
        :actor (User):  :class:`django.contrib.auth.models.User` that realized the action
        :object_owner (User):  :class:`django.contrib.auth.models.User` that owns the object
        :date (datetime): Date the action was realized
        :observations (CharField): Some cases could be necessary add an observation
        :object (Model): Any model that inherits from :class:`django.models.Model`
        :authorized (User[]): :class:`django.contrib.auth.models.User` authorized users with acccess to this history
        :related (ObjectRelated): :class:`history.models.HistoryRelated` related objects to this history

    '''
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
        (ADD,       'Add'),
        (EDIT,      'Edit'),
        (DELETE,    'Delete'),
        (ACCESS,    'Access'),
        (CANCEL,    'Cancel'),
        (DONE,      'Done'),
        (APPROVE,   'Approve'),
        (COMMENT,   'Comment'),
        (RECOVER,   'Recover')
    )

    event               = models.PositiveSmallIntegerField(choices=EVENTS, default=ADD)
    actor               = models.ForeignKey(User)
    date                = models.DateTimeField(auto_now_add=True)
    observations        = models.CharField(max_length=2000, null=True, blank=True)

    # generic foreign key that refers to the object related to this action
    object_type         = models.ForeignKey(ContentType)
    object_id           = models.PositiveIntegerField()
    object              = GenericForeignKey('object_type', 'object_id')

    authorized          = models.ManyToManyField(User, related_name='authorized')
    related             = models.ManyToManyField(HistoryRelated, related_name='related')

    def obj_repr(self):
        '''
        Returns a representation of the generic object
        '''
        return self.object.__unicode__()

    def actor_repr(self):
        '''
        Returns textual representation of the actor,
        preferably a full name, but an email if no name is available.
        '''
        tmp = self.actor.get_full_name()

        if tmp != None:
            return tmp

        return self.actor.email

    @classmethod
    def new(self, event, actor, object, observations=None, authorized=None, related=None):
        '''
        Generates a new generic history object
        '''
        action = History(event=event, actor=actor, object=object, observations=observations)
        action.save()

        action.authorized.add(actor)
        if authorized != None:
            for userAuthorized in authorized:
                action.authorized.add(userAuthorized)

        if related != None:
            for relation in related:
                historyRelated = HistoryRelated(object=relation)
                historyRelated.save()

                action.related.add(historyRelated)
        #self.post_new.send(sender=self.__class__, instance=action)
        return action

    @staticmethod
    def all(user=None):
        '''
        Returns user history
        '''
        history = History.objects.all()

        if user != None:
            history = history.filter(authorized=user)

        return history

    @staticmethod
    def type(Model, pk, related=False):
        '''
        Retrieves all history objects for a given Model
        '''
        try:
            req = None
            try:
                # since i have models with MTI, i have to try it first, otherwise i could not retrieve all historic
                req = Model.objects.get_subclass(hash=pk)
            except AttributeError:
                req = Model.objects.get(hash=pk)

            type = ContentType.objects.get_for_model(req)

            if related:
                return History.objects.filter(
                    Q(object_type=type, object_id=req.id) | Q(related__object_type=type, related__object_id=req.id))

            return History.objects.filter(object_type=type, object_id=req.id)
        except Model.DoesNotExist:
            pass

        return History.objects.none()


