# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse

from rest_framework.test import APIClient, APIRequestFactory
from rest_framework import status

from accounts.models import UserRecovery

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
        :return User
        '''
        response = self.client.post('/api/account/register/', self.userData, format='json')

        user = User.objects.get(username=self.userName)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED) #Check if response is created
        self.assertEqual(user.email, self.email)                        #Check if is created
        self.assertFalse(user.is_active)                                #Check if is not active
        self.assertFalse(user.is_staff)                                 #Check if is not stuff

        return user

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
        self.assertEqual(response.status_code, status.HTTP_200_OK)                  # Check if response is ok
        self.client.logout()

    def test_login(self):
        '''
        Test the login method to access the system (not allow inactive users to log)
        '''
        user = self.test_create_user()
        password = self.userData['password']

        #Unative user
        response = self.client.post('/api/account/login/', {
            "username": user.username,
            "password": password
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)        # Check if response is unauthorized
        self.assertFalse(response.data["authenticated"])                            # Check if is not authenticated

        #Wrong password
        response = self.client.post('/api/account/login/', {
            "username": user.username,
            "password": password + "12345"
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)         # Check if response is a bad request
        self.assertFalse(response.data["authenticated"])                            # Check if is not authenticated

        #Call a web services that needs login
        response = self.client.get('/api/account/', format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)        # Check if response is not authorized

        #Active user
        self.client.force_authenticate(self.admin)
        response = self.client.post('/api/account/activateUser/', {"email": user.email}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)                  # Check if response is ok
        self.client.logout()

        response = self.client.post('/api/account/login/', {
            "username": user.username,
            "password": password
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)                  # Check if response is ok

        numUserInBD = User.objects.all().count()
        response = self.client.get('/api/account/', format='json')
        self.assertEqual(response.data["count"], numUserInBD)                       # Check if the response has all the users
        self.assertEqual(response.status_code, status.HTTP_200_OK)                  # Check if response is ok

    def test_logout(self):
        '''
        Test the logout function using the user tested in the function login
        '''
        self.test_login()

        response = self.client.get('/api/account/logout/', {}, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)                  # Check if response is ok
        self.assertFalse(response.data["authenticated"])                            # Check if is not authenticated

        response = self.client.get('/api/account/', format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)        # Check if response is not authorized

    def test_recovery_user(self):
        '''
        Test the user recovery and all the situations.
        Needs to be tested if the user receives the email and can recover the password
        '''
        #Using an unregisted email
        response = self.client.post('/api/account/recoverPassword/', {"email": "dummy@ua.pt"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)         # Check if response is a bad request
        self.assertEqual(response.data["error"], "An user with this email does not exist.")

        #Doing a bad request
        response = self.client.post('/api/account/recoverPassword/', {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)         # Check if response is a bad request
        self.assertEqual(response.data["error"], "Email is a mandatory field when a password is recover.")

        #Using a logged user (this is not a good test because maybe we want to recovery users loged but...)
        self.client.force_authenticate(self.simpleUser)
        response = self.client.post('/api/account/recoverPassword/', {"email": self.simpleUser.email}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)         # Check if response is a bad request
        self.assertEqual(response.data["error"], "An already logged in user can't recover a password!")
        self.client.logout()

        #The right behavior
        response = self.client.post('/api/account/recoverPassword/', {"email": self.simpleUser.email}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)                  # Check if response is ok
        userRecovery = UserRecovery.objects.get(user=self.simpleUser) #This hash is received by email

        #Incomplete request
        response = self.client.post('/api/account/changePassword/', {
            "password": "new12345qwert"
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)         # Check if response is a bad request
        self.assertEqual(response.data["error"], "This request is not valid.")

        #Request well done
        response = self.client.post('/api/account/changePassword/', {
             "hash": userRecovery.hash,
            "password": "new12345qwert"
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)                  # Check if response is ok
        self.assertTrue(response.data["success"])

        #Reusing the same hash
        response = self.client.post('/api/account/changePassword/', {
            "hash": userRecovery.hash,
            "password": "new12345qwert"
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)         # Check if response is a bad request
        self.assertEqual(response.data["error"], "Either the request does not exist, or it has expired.")

    def test_check_duplicated_email(self):
        '''
        Look up for duplicated emails, when the user registers
        '''
        #Using a email from a registed user
        response = self.client.post('/api/account/checkEmail/', {"email": self.simpleUser.email}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)         # Check if response is ok
        self.assertEqual(response.data["email"], self.simpleUser.email)
        self.assertFalse(response.data["available"])

        #Using a available email
        response = self.client.post('/api/account/checkEmail/', {"email": "dummy@ua.pt"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)                  # Check if response is ok
        self.assertEqual(response.data["email"], "dummy@ua.pt")
        self.assertTrue(response.data["available"])

        #Not using nothing
        response = self.client.post('/api/account/checkEmail/', {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)         # Check if response is a bad request
        self.assertEqual(response.data['error'], "Email is mandatory field to check if email is free")

    def test_update_information(self):
        '''
        Test the update of personal data
        '''
        #get personal details without login
        response = self.client.get('/api/account/personalAccountDetails/', {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)        # Check if response is unauthorized

        self.test_login()
        response = self.client.get('/api/account/personalAccountDetails/', {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)                  # Check if response is ok
        self.assertEqual(response.data["username"], self.userData["username"])
        self.assertEqual(response.data["email"], self.userData["email"])


        response = self.client.patch('/api/account/personalAccountDetails/', {
            "username": "updatedUser",
            "first_name": "updatedUser",
            "last_name": "updatedUser",
            "email": "new.email@ua.pt",
            "profile": {"role": 2},
            "password": "12345qwert"
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)  # Check if response is ok
        self.assertEqual(response.data["username"], "updatedUser")
        self.assertEqual(response.data["first_name"], "updatedUser")
        self.assertEqual(response.data["last_name"], "updatedUser")
        self.assertEqual(response.data["email"], "new.email@ua.pt")
        self.assertEqual(response.data["profile"],{"role": 2})

