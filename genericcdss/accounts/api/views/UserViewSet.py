# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from rest_framework import viewsets, filters
from rest_framework.decorators import api_view, list_route
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status

from accounts.models import Profile, UserRecovery
from accounts.api.serializers import UserSerializer

from history.models import History

from utils.time import sessionExpiringTime

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    filter_backends = [filters.OrderingFilter]#filters.DjangoFilterBackend
    filter_fields = ["username", "first_name", "last_name", "email", "is_staff", "last_login", "id"]

    def list(self, request, *args, **kwargs):
        """
        Return a list of users
        """
        return super(UserViewSet, self).list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        """
        Insert a new user (staff only)
        """
        return super(UserViewSet, self).create(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve a user, by id
        """
        return super(UserViewSet, self).retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        """
        Update a user, by id (staff only)
        """
        return super(UserViewSet, self).update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        """
        Partial Update a user, by id (staff only)
        """
        return super(UserViewSet, self).partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        """
        Delete a user, by id (staff only)
        """
        return super(UserViewSet, self).partial_update(request, *args, **kwargs)

    @list_route(methods=['get', 'patch'])
    def personalAccountDetails(self, request):
        """
        Get personal account details, if logged in.
        """
        if request.user.is_authenticated():
            try:
                profile = request.user.profile
            except Profile.DoesNotExist:
                profile = Profile(user=request.user)
                profile.save()

            serializer = UserSerializer(instance=request.user, context={'request': request})

            if request.method == 'PATCH':
                password = request.data.pop('password', None)

                serializer.update(request.user, request.data)
                if password:
                    request.user.set_password(password)
                    request.user.save()

            return Response(serializer.data)
        else:
            return Response({'authenticated': False})

    @list_route(methods=['post'], permission_classes=[permissions.AllowAny])
    def checkEmail(self, request):
        """
        Case insensitive checks if a email is available to be registered as a username.
        """
        email = request.data.get('email')

        if email != None:
            email = email.lower()
            try:
                user = User.objects.get(email=email)

                return Response({
                    'email': email,
                    'available': False
                })
            except User.DoesNotExist:
                return Response({
                    'email': email,
                    'available': True
                })

        return Response({
            'error': "Email is mandatory field to check if email is free"
        })

    @list_route(methods=['post'])
    def activateUser(self, request):
        """
        Activates an inactive user. Can only be used by staff users to activate other users.
        """
        email = request.data.get('email', None)

        if request.user.is_staff and email != None:
            email = email.lower()
            try:
                user = User.objects.get(email=email)

                if not user.is_active:
                    user.is_active = True
                    user.save()

                    users_involved = [user]
                    staff = User.objects.filter(is_staff=True)
                    for user in staff:
                        users_involved.append(user)

                    History.new(event=History.APPROVE, actor=request.user, object=user, authorized=users_involved)

                    return Response({
                        'success': True
                    }, status=status.HTTP_200_OK)

                return Response({
                    'error': 'User already activated'
                }, status=status.HTTP_405_METHOD_NOT_ALLOWED)

            except User.DoesNotExist:
                return Response({
                    'error': "Can't activate user, %s it doesn't exist" % email
                }, status=status.HTTP_405_METHOD_NOT_ALLOWED)

        return Response({
            'error': "Invalid or not authorized request"
        }, status=status.HTTP_401_UNAUTHORIZED)

    @list_route(methods=['post'], permission_classes=[permissions.AllowAny])
    def register(self, request):
        """
        Allows users to register themselves. Being then put on a waiting list to be approved.
        """
        if request.user.is_authenticated():
            return Response({
                'error': "An already registered user can't register new users!"
            })
        dataRequest = request.data.copy()
        password = dataRequest.pop('password', None)
        email = dataRequest.get('email', None)

        if email != None and password != None:
            email = email.lower()

            try:
                user = User.objects.get(email=email)

                return Response({
                    'error': "An user with this email already exists"
                }, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                if(not 'username' in dataRequest):
                    dataRequest['username'] = email[:30]
                dataRequest['email'] = email
                serializer = UserSerializer(data=dataRequest, context={'request': request})

                user_validated = serializer.is_valid(raise_exception=True)

                if user_validated:
                    new_user = serializer.save()

                    new_user.set_password(password)
                    new_user.is_active = False
                    new_user.save()

                    staff = User.objects.filter(is_staff=True)

                    History.new(event=History.ADD, actor=new_user, object=new_user, authorized=staff)

                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response({
                    'error': "User details invalid"
                }, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'error': "Email and password are mandatory fields on registering a new user"
        }, status=status.HTTP_400_BAD_REQUEST)

    @list_route(methods=['post'], permission_classes=[permissions.AllowAny])
    def recoverPassword(self, request):
        """
        Allows users to ask for password recovery(which needs to be confirmed).
        """
        if request.user.is_authenticated():
            return Response({
                'error': "An already logged in user can't recover a password!"
            })

        email = request.data.get('email', None)

        if email != None:
            email = email.lower()
            try:
                user = User.objects.get(email=email)

                userRecovery = UserRecovery(user=user)
                userRecovery.save()

                History.new(event=History.RECOVER, actor=user, object=userRecovery, authorized=[user])

                return Response({'success': True})
            except User.DoesNotExist:
                pass

            return Response({
                'error': "An user with this email does not exist."
            })
        return Response({
            'error': "Email is a mandatory field when a password is recover"
        })

    @list_route(methods=['post'], permission_classes=[permissions.AllowAny])
    def changePassword(self, request):
        """
        Allows users to change their own password, after confirming a password recovery.
        """
        if request.user.is_authenticated():
            return Response({
                'error': "An already logged in user can't recover a password!"
            })

        hash = request.data.get('hash', None)
        new_password = request.data.get('password', None)

        if hash != None and new_password != None:
            try:
                userRecovery = UserRecovery.getUserRecovery(hash=hash)

                userRecovery.setNewPassword(new_password)

                History.new(event=History.EDIT, actor=userRecovery.user, object=userRecovery.user, authorized=[userRecovery.user])

                return Response({'success': True})
            except UserRecovery.DoesNotExist:
                return Response({
                    'error': "Either the request does not exist, or it has expired."
                })

        return Response({
            'error': "This request is not valid."
        })

    @list_route(methods=['post'], permission_classes=[permissions.AllowAny])
    def login(self, request):
        """
        Logs in an user doing case insentitive validation for emails.
        """
        if not request.user.is_authenticated():
            username = request.data.get('username', None)
            password = request.data.get('password', None)

            if request.data.get('remember', False):
                request.session.set_expiry(sessionExpiringTime())

            if username != None:
                username = username.lower()

            if '@' in username:
                try:
                    user = User.objects.get(email=username)
                    username = user.username
                except:
                    pass

            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    login(request, user)
                else:
                    return Response({
                        'authenticated': False,
                        'error': 'This account is disabled. This may be because of you are waiting approval.If this is not the case, please contact the administrator'
                    })
            else:
                return Response({
                    'authenticated': False,
                    'error': 'This login username and password are invalid'
                })

        return self.personal_account_details(request)

    @list_route(methods=['get'])
    def logout(self, request):
        """
        Logs out a logged in user
        """
        logout(request)

        return Response({'authenticated': False})
