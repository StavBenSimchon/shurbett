#! /usr/bin/env bash

case "$1" in
    "build")
        docker build . -t surebet:latest
    ;;
    "run")
        echo "node server.js"
        docker rm -f app
        docker run -p 8000:8000 --name app surebet 
    ;;
    "debug")
        echo "node --inspect=0.0.0.0:9229 server.js"
        docker rm -f app
        docker run -it --rm -p 8000:8000 -p 9229:9229 --name app surebet sh
    ;;
esac