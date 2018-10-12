from django.conf import settings

def base(context):
  return {'BASE_URL': settings.BASE_URL}
