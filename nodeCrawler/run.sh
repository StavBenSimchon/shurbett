echo '
Building image
'
docker build -t crawler .
echo '
Running image
'
docker run -it --rm -p 192.168.99.100:8000:8000 crawler 
