# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from django.contrib.auth.models import User

from accounts.models import Profile

class ProfileTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user('admin', 'admin@ua.pt', '12345')
        self.profile = Profile(user=self.user, role=Profile.ADMINISTRATOR)

    def test_model_can_create_a_profile(self):
        old_count = Profile.objects.count()
        self.profile.save()
        new_count = Profile.objects.count()

        self.assertEqual(old_count + 1, new_count)

    def test_unicode_(self):
        self.unicode = u"User profile for %s" % self.user

        self.assertEqual(self.unicode, self.profile.__unicode__())

    def test_model_can_create_a_profile_nurse_type(self):
        nurse = User.objects.create_user('Nurse', 'nurse@ua.pt', '12345')
        nurse_profile = Profile(user=nurse, role=Profile.NURSE)
        old_count = Profile.objects.filter(role=Profile.NURSE).count()
        nurse_profile.save()
        new_count = Profile.objects.filter(role=Profile.NURSE).count()

        self.assertEqual(old_count + 1, new_count)

    def test_model_can_create_a_profile_physician_type(self):
        physician = User.objects.create_user('Doctor', 'doctor@ua.pt', '12345')
        physician_profile = Profile(user=physician, role=Profile.PHYSICIAN)
        old_count = Profile.objects.filter(role=Profile.PHYSICIAN).count()
        physician_profile.save()
        new_count = Profile.objects.filter(role=Profile.PHYSICIAN).count()

        self.assertEqual(old_count + 1, new_count)
