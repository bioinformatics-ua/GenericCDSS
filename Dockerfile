FROM    python:2.7
MAINTAINER Joao Almeida

ADD     ./Backend /GenericCDSS/Backend
ADD     ./UI /GenericCDSS/UI
ADD     ./Makefile /GenericCDSS
ADD     ./config /GenericCDSS/config

RUN     apt-get update && \
        apt-get install -y -q vim curl nginx uwsgi-plugin-python

RUN 	curl -sL https://deb.nodesource.com/setup_8.x | bash

RUN		apt-get install -y nodejs

WORKDIR  /GenericCDSS

RUN 	nodejs -v

RUN 	cd UI/ && npm install && npm run build

RUN     mkdir -p /var/log/gunicorn

RUN     pip install -r ./config/requirements.pip --no-cache-dir
