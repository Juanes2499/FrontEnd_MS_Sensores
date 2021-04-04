#!/bin/bash
#Stopping existing node servers
echo "Deteniendo servicios desplegados de ReactJs"

# if [ sudo lsof -t -i:3000 ]; then
#   sudo kill -9 $(sudo lsof -t -i:3000) 
# else
#   echo "Not working"
# fi