FROM    python:2.7
MAINTAINER Joao Almeida

ADD     ./Backend /GenericCDSS/Backend
ADD     ./UI /GenericCDSS/UI
ADD     ./Makefile /GenericCDSS
ADD     ./config /GenericCDSS/config

RUN     apt-get update && \
        apt-get install -y -q vim nginx nodejs uwsgi-plugin-python && \
        rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/* 

        #&6 \
        #npm install && npm run build-production

WORKDIR  /GenericCDSS

RUN     mkdir -p /var/log/gunicorn


RUN     pip install -r ./config/requirements.pip --no-cache-dir
