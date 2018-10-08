#!/bin/sh

echo "------------------------------------------"
echo "---- Backend Deploy ------ "

if [ ${DEPLOY_MODE} = "demo" ]; then
	make defaultDemo
else
    make setUpSystem
fi

cd /GenericCDSS/Backend

python manage.py collectstatic --noinput

exec gunicorn genericcdss.wsgi:application --bind 0.0.0.0:8000 --workers 3

tail -f /dev/null
