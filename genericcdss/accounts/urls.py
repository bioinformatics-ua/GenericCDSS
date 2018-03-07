from django.conf.urls import include, url
from rest_framework import routers

from api.views import UserViewSet

router = routers.DefaultRouter()
router.register(r'', UserViewSet, base_name='user-detail')

urlpatterns = [
    #url(r'^', UserViewSet.as_view(), name="create")
    url(r'^', include(router.urls))
]
