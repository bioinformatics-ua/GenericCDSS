from django.utils import timezone

def nextMonth():
    return timezone.now() + timezone.timedelta(days=30)
