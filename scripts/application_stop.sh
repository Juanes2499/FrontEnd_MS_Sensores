#!/bin/bash
#Stopping existing node servers
echo "Deteniendo servicios desplegados de ReactJs"
sudo kill -9 $(sudo lsof -t -i:3000)