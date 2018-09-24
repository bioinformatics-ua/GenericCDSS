#!/bin/sh

echo "------------------------------------------"
echo "---- Running project migrations ------ "
cd /Backend

python manage.py migrate --noinput

python manage.py adduser admin admin@example.com 12345 y

python manage.py collectstatic --noinput

su django-deploy

gunicorn genericcdss.wsgi:application --bind 0.0.0.0:8000 --workers 3

cd ..


#CMD cd Backend && exec gunicorn genericcdss.wsgi:application --bind 0.0.0.0:8000 --workers 3