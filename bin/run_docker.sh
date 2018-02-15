#!/bin/sh
export TERM=xterm
ln -s /usr/bin/nodejs /usr/bin/node

cd /my-app

npm install

npm install --save react

npm start
