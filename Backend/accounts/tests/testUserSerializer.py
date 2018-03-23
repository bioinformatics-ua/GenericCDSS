# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from django.contrib.auth.models import User

from accounts.models import Profile
from accounts.api.serializers import UserSerializer

class UserSerializerTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='userSerializer',
                                             email='userSerializer@ua.pt',
                                             password='12345',
                                             first_name="user",
                                             last_name="serializer")

        self.email = 'createdUserSerializer@ua.pt'

    def test_serializer_composition(self):
        result = UserSerializer(self.user)
        desiredFormat = {
            u'username': self.user.username,
            u'profile': None,
            u'first_name': self.user.first_name,
            u'last_name': self.user.last_name,
            u'id': self.user.id,
            u'is_staff': False,
            u'last_login': None,
            u'fullname': self.user.get_full_name(),
            u'email': self.user.email
        }

        self.assertEqual(result.data, desiredFormat)

    def test_create_user(self):
        user_data = {
            'username': 'createdUserSerializer',
            'email': self.email,
            'password': '12345',
            'first_name': "CreatedUser",
            'last_name': "UsingSerializer",
            "profile": {
                "role": Profile.NURSE
            }
        }

        user_serialized = UserSerializer(data=user_data)
        user_serialized_valid = user_serialized.is_valid()
        user_created = user_serialized.save()
        user_in_database = User.objects.get(email=self.email)

        self.assertTrue(user_serialized_valid)
        self.assertEquals(user_in_database, user_created)
        self.assertFalse(user_in_database.is_active)

    def test_update_user(self):
        self.test_create_user()
        username_to_update = 'updatedUserSerializer'
        first_name_to_update = "UpdatedUser"
        last_name_to_update = "UsingSerializer2"

        user_data_to_update = {
            'username': username_to_update,
            'email': self.email,
            'password': '123456789',
            'first_name': first_name_to_update,
            'last_name': last_name_to_update,
            "profile": {
                "role": Profile.PHYSICIAN
            }
        }

        user_in_database = User.objects.get(email=self.email)
        user_serialized = UserSerializer(instance=user_in_database, data=user_data_to_update)
        user_serialized_valid = user_serialized.is_valid()
        user_created = user_serialized.save()
        user_in_database_after_updated = User.objects.get(email=self.email)

        self.assertTrue(user_serialized_valid)
        self.assertEquals(user_in_database_after_updated, user_created)

        self.assertEquals(user_in_database_after_updated.username, username_to_update)
        self.assertEquals(user_in_database_after_updated.first_name, first_name_to_update)
        self.assertEquals(user_in_database_after_updated.last_name, last_name_to_update)

    def test_try_to_create_a_staff_user_trough_serializer(self):
        email = 'createdStaffUserSerializer@ua.pt'
        user_data = {
            'username': 'createdStaffUserSerializer',
            'email': email,
            'password': '12345',
            'first_name': "CreatedStaffUser",
            'last_name': "UsingSerializer",
            'is_staff' : True,
            "profile": {
                "role": Profile.NURSE
            }
        }
        user_serialized = UserSerializer(data=user_data)
        user_serialized_valid = user_serialized.is_valid()
        user_created = user_serialized.save()

        self.assertTrue(user_serialized_valid)
        self.assertFalse(user_created.is_staff)

