# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.utils import timezone

from accounts.models import UserRecovery

class UserRecoveryTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user('admin', 'admin@ua.pt', '12345')


    def test_model_can_create_a_UserRecovery(self):
        userRecovery = UserRecovery(user=self.user)
        old_count = UserRecovery.objects.count()
        userRecovery.save()
        new_count = UserRecovery.objects.count()

        self.assertEqual(old_count + 1, new_count, "The UserRecovery module can not create a new entry")

    def test_unicode_(self):
        userRecovery = UserRecovery(user=self.user)
        self.unicode = u"Password Recovery for %s" % self.user

        self.assertEqual(self.unicode, userRecovery.__unicode__(), "The UserRecovery has an issue in the unicode method")

    def test_UserRecovery_can_be_used_outdate(self):
        outdated = timezone.now() - timezone.timedelta(days=30)
        userRecovery = UserRecovery(user=self.user, validity=outdated)
        userRecovery.save()

        userRecovery_outdated = UserRecovery.getUserRecovery(userRecovery.hash)

        self.assertIsNone(userRecovery_outdated, "UserRecovery is outdated and it can not be used")


    def test_UserRecovery_can_be_used_twice(self):
        userRecovery = UserRecovery(user=self.user)
        userRecovery.save()
        new_password = "54321"
        hash = userRecovery.hash

        UserRecovery.getUserRecovery(hash=hash).setNewPassword(new_password)
        user_authenticated = authenticate(username=self.user.username, password=new_password)

        self.assertIsNotNone(user_authenticated, "Password recovery did not work")

        userRecovery_after_use = UserRecovery.getUserRecovery(hash)

        self.assertIsNone(userRecovery_after_use, "UserRecovery can be used for the second time")