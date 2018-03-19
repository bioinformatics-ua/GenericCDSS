# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse

from rest_framework.test import APIClient, APIRequestFactory
from rest_framework import status

class UserViewSetTestCase(TestCase):
    def setUp(self):
        '''
        Set up an admin user and a simple. Also, some data to create new user in some services
        '''
        self.client = APIClient()

        self.admin = User.objects.create_user('admin', 'admin@ua.pt', '12345')
        self.admin.is_staff = True
        self.admin.save()

        self.simpleUser = User.objects.create_user('simpleUser', 'simple@ua.pt', '12345')
        self.simpleUser.save()

        self.userName = "user"
        self.email = "test@ua.pt"
        self.userData = {
            "username": self.userName,
            "first_name": "user",
            "last_name": "test",
            "email": self.email,
            "profile": {"role": 1},
            "password": "12345"
        }

    def test_create_user(self):
        '''
        Test the user creation through the webservice
        Should be a normal user, inactive and not be staff
        '''
        response = self.client.post('/api/account/register/', self.userData, format='json')

        user = User.objects.get(username=self.userName)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED) #Check if response is created
        self.assertEqual(user.email, self.email)                        #Check if is created
        self.assertFalse(user.is_active)                                #Check if is not active
        self.assertFalse(user.is_staff)                                 #Check if is not stuff

    def test_try_create_forced_active_user(self):
        '''
        Try to create a user,forcing the ativation without permission
        '''
        self.userData["is_active"] = True #Force active True
        response = self.client.post('/api/account/register/', self.userData, format='json')

        user = User.objects.get(username=self.userName)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED) # Check if response is created
        self.assertEqual(user.email, self.email)                        # Check if is created
        self.assertFalse(user.is_active)                                # Check if is not active
        self.assertFalse(user.is_staff)                                 # Check if is not stuff

        self.client.force_authenticate(user)
        response = self.client.post('/api/account/activateUser/', {"email": user.email}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)        # Check if response is not authorized
        self.client.logout()

    def test_try_create_forced_staff_user(self):
        '''
        Try to create a staff user without permission
        '''
        self.userData["is_staff"] = True #Force staff True
        response = self.client.post('/api/account/register/', self.userData, format='json')

        user = User.objects.get(username=self.userName)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED) # Check if response is created
        self.assertEqual(user.email, self.email)                        # Check if is created
        self.assertFalse(user.is_active)                                # Check if is not active
        self.assertFalse(user.is_staff)                                 # Check if is not stuff

    def test_active_user(self):
        '''
        Try to activate a user, where only staff is allowed
        '''
        response = self.client.post('/api/account/register/', self.userData, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)             # Check if response is created
        user = User.objects.get(username=self.userName)

        #Unauthenticated
        response = self.client.post('/api/account/activateUser/', { "email":user.email}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)        # Check if response is not authorized

        #Normal user authenticated
        self.client.force_authenticate(self.simpleUser)
        response = self.client.post('/api/account/activateUser/', {"email": user.email}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)        # Check if response is not authorized
        self.client.logout()

        #Staff authenticated
        self.client.force_authenticate(self.admin)
        response = self.client.post('/api/account/activateUser/', {"email": user.email}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)                  # Check if response is ok

        response = self.client.post('/api/account/activateUser/', {"email": user.email}, format='json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)  # Check if response is method is not allowed

    def test_list_users(self):
        '''
        Get a list of users, and check if it is splited right and if all of them are created
        '''
        numUserToCreate = 20
        usersContageBeforeCreatingRandomUsers = User.objects.all().count()
        for index in range(0,numUserToCreate):
            user = User.objects.create_user('user ' + str(index), 'simple'+ str(index) + '@ua.pt', '12345')
            user.save()

        # Unauthenticated
        response = self.client.get('/api/account/', format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)        # Check if response is not authorized

        # Normal user authenticated
        self.client.force_authenticate(self.simpleUser)
        response = self.client.get('/api/account/', format='json')

        self.assertEqual(response.data["count"], numUserToCreate + usersContageBeforeCreatingRandomUsers) # Check if the response has all the users
        self.assertEqual(response.status_code, status.HTTP_200_OK)                  # Check if response is not authorized
        self.client.logout()

    def test_recovery_user(self):
        print "TO DO"

    def test_register(self):
        print "TO DO"

    def test_login(self):
        print "TO DO"

    def test_logout(self):
        print "TO DO"

    def test_change_password(self):
        print "TO DO"

    def test_check_duplicated_email(self):
        print "TO DO"

    def test_update_information(self):
        print "TO DO"
