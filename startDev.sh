#!/bin/sh

echo "INCOMPLETE"

echo "Starting NPM..."

tmux new -d -s genericcdss -n NPM 'cd ./UI; npm start'

echo "Starting Django..."

tmux new-window -t genericcdss -n DJANGO 'source ./env/bin/activate; cd ./Backend/; python manage.py runserver'

echo "Working..."

tmux a
