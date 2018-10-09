#!/bin/sh

echo "------------------------------------------"
echo "-------------- Check DB UP ---------------"
echo "------------------------------------------"

check_up() {
    service=$1
    host=$2
    port=$3

    max=13 # 1 minute

    counter=1
    while true;do
        python -c "import socket;s = socket.socket(socket.AF_INET, socket.SOCK_STREAM);s.connect(('$host', $port))" \
        >/dev/null 2>/dev/null && break || \
        echo "Waiting that $service on $host:${port} is started (sleeping for 5) on counter ${counter}"

        if [ $counter = $max ]; then
            echo "Could not connect to ${service} after some time"
            echo "Investigate locally the logs with fig logs"
            exit 1
        fi

        sleep 5

        counter=$(expr "$counter" + "1")
    done
}

check_up "postgres" db 5432

echo "------------------------------------------"
echo "------------- Backend Deploy -------------"
echo "------------------------------------------"
cd /GenericCDSS

if [ ${DEPLOY_MODE} = "demo" ]; then
    make defaultDemo
else
    make setUpSystem
fi

cd /GenericCDSS/Backend

python manage.py collectstatic --noinput

exec gunicorn genericcdss.wsgi:application --bind 0.0.0.0:8000 --workers 3

tail -f /dev/null
