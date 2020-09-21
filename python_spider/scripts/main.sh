#! /bin/bash
set -e
echo '
network: mynet'
docker network ls | grep mynet 1>/dev/null || \
docker network create mynet
echo '
splash server'
docker pull scrapinghub/splash 1>/dev/null
docker ps | grep splash 1>/dev/null || \
docker run -d --network mynet --name splash scrapinghub/splash


docker build . -t my:con 1>/dev/null  
echo '
running image
'
docker run -it --rm --network mynet --name app  my:con