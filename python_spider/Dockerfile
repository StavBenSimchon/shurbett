FROM python:3.9-rc-alpine
WORKDIR /opt/app/
RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
&& echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
&& apk update 
# && apk add --no-cache chromium chromium-chromedriver 

RUN apk add --no-cache libxml2-dev libxslt-dev g++ gcc
RUN pip install -U pip requests beautifulsoup4 pyyaml lxml
RUN apk del g++ gcc
RUN apk update

COPY . .

CMD python main.py