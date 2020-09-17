#! /bin/bash
set -e
docker network ls | grep mynet 1>/dev/null || \
docker network create mynet
echo '
network: mynet'
docker pull scrapinghub/splash 1>/dev/null
docker ps | grep splash 1>/dev/null || \
docker run -d --network mynet --name splash scrapinghub/splash
echo '
splash server is Running'

docker build . -t my:con 1>/dev/null  
echo '
running image
'
docker run -it --rm --network mynet --name app  my:con