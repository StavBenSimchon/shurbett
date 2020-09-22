cd ./app
docker build . -t my:con 1>/dev/null  
echo '
running image
'
docker run -it --rm --network mynet --name test  my:con python test.py