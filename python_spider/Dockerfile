FROM python:3.9-rc-alpine
WORKDIR /opt/app/
COPY . .
RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
&& echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
&& apk update \
&& apk add chromium chromium-chromedriver \
&& pip install -U selenium
CMD python main.py