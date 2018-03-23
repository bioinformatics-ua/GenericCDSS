FROM    ubuntu:16.04

ENV     DEBIAN_FRONTEND noninteractive
#################### INSTALL STUFF ############################################
#RUN     pip install -U pip

RUN     apt-get update && \
        apt-get install -y -q nodejs wget npm vim && \
        rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*

ADD     .   my-app/



EXPOSE  80
#EXPOSE  8000
CMD     cd my-app/bin && sh run_docker.sh

###############################################################################



