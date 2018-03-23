# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from django.contrib.auth.models import User

from accounts.api.serializers import ProfileSerializer
from accounts.models import Profile

class ProfileTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='userSerializer',
                                             email='userSerializer@ua.pt',
                                             password='12345',
                                             first_name="user",
                                             last_name="serializer")
        self.profile = Profile(user=self.user, role=Profile.ADMINISTRATOR)


    def test_serializer_composition(self):
        result = ProfileSerializer(self.profile)
        desiredFormat = {
            u'role': Profile.ADMINISTRATOR
        }

        self.assertEqual(result.data, desiredFormat)