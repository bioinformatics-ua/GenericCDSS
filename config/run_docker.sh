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

exec gunicorn genericcdss.wsgi:application --bind 0.0.0.0:8000 --workers 3 &

echo "------------------------------------------"
echo "------------- Frontend Deploy ------------"
echo "------------------------------------------"
cd /GenericCDSS/UI

echo "Defing api url..."
apiURL=$(echo $API_URL)
if [ -z "$apiURL" ]
then
	echo "API_URL not defined"
else
	echo "Change API URL in package"
	jq -c 'del(.api_url)' package.json > tmp.json && mv tmp.json package.json

	jq -c '. + { "api_url": "'$apiURL'" }' package.json > tmp.json && mv tmp.json package.json
fi

echo "Defining homepage url..."
homepage=$(echo $HOMEPAGE)
if [ -z "$homepage" ]
then
	echo "Homepage url not defined"
else
	echo "Change homepage in package"
	jq -c 'del(.homepage)' package.json > tmp.json && mv tmp.json package.json
	jq -c '. + { "homepage": "'$homepage'" }' package.json > tmp.json && mv tmp.json package.json
fi

echo "Defining baseurl..."
base_url=$(echo $BASE_URL)
if [ -z "$base_url" ]
then
	echo "Homepage url not defined"
else
	echo "Change homepage in package"
	jq -c 'del(.baseurl)' package.json > tmp.json && mv tmp.json package.json
	jq -c '. + { "base_url": "'$base_url'" }' package.json > tmp.json && mv tmp.json package.json
fi

npm run build

tail -f /dev/null
