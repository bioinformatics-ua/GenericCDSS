FROM    python:2.7
MAINTAINER Joao Almeida

ADD     ./Backend /GenericCDSS/Backend
ADD     ./UI /GenericCDSS/UI
ADD     ./Deploy /GenericCDSS/Deploy

WORKDIR  /GenericCDSS

RUN pip install -r ./Backend/requirements.txt --no-cache-dir

CMD     cd ./Deploy/bin && sh run.sh

###############################################################################



