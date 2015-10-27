#!/bin/sh

if [ $# -ne 1 ]
then
  echo "Usage: `basename $0` {directory}"
  exit
fi
cd $1
git init
git add */.*
git commit -m "Update template file repository"
git update-server-info