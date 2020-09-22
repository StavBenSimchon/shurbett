FROM node:12-alpine3.10

WORKDIR /opt/app/

COPY ./package*.json ./

RUN apk update && apk add --no-cache chromium
RUN export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true && npm i

COPY . .

CMD ["node", "server.js"]
