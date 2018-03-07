from django.utils import timezone

def nextMonth():
    return timezone.now() + timezone.timedelta(days=30)

def sessionExpiringTime():
    return 1296000   # if set to remember, keep for 2 weeks