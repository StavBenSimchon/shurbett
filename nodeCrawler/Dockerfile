FROM node:12-alpine3.10

WORKDIR /opt/app/

RUN apk update && apk add --no-cache chromium git

COPY . .

CMD ["node", "server.js"]
