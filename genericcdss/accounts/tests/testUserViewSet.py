# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from django.core.urlresolvers import reverse

"""
o que testar?
criar utilizadores no set up
verificar se nao estao ativos
colocar um como staf e ativa um user normal deu? s
um user normal tenta ativar outro user, deu? n
um user regista-se mas nao faz login ate ser ativo
depois de ativo faz login
recover da password
pede 2 recovers e tenta usar o primeiro, é valido? nao e importante
verificar introduçao do mesmo email
"""


class UserViewSetTestCase(TestCase):
    def setUp(self):
        pass
        '''
        self.client = APIClient()
        self.user_data = {
            'username': 'John',
            "first_name": "John",
            "last_name": "Almeida",
            "email": "joao.rafael.almeida@ua.pt",
            "role": 3
        }
        self.response = self.client.post(
            reverse('create'),
            self.user_data,
            format="json")
        '''

    def test_create_user(self):

        self.assertTrue(False, "To do")

    def test_active_user(self):
        pass

    def test_list_users(self):
        pass

    def test_recovery_user(self):
        pass

    def test_register(self):
        pass

    def test_login(self):
        pass

    def test_logout(self):
        pass

    def test_change_password(self):
        pass

    def test_check_duplicated_email(self):
        pass

    def test_update_information(self):
        pass
