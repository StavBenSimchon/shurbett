FROM node:12-alpine3.10

WORKDIR /opt/app/

COPY ./package*.json ./

RUN apk update && apk add --no-cache chromium
RUN export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true && npm i

COPY . .

CMD ["node", "server.js"]


#docker run -e ARANGO_RANDOM_ROOT_PASSWORD=1 -p 8529:8529 -d arangodb

#docker run -e ARANGO_ROOT_PASSWORD=password -d --name arangodb-instance arangodb

#docker run -e ARANGO_NO_AUTH=1 -p 168.162.99.100:8529:8529 -d --name arangodb-instance arangodb
