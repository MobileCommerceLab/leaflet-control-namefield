#!/bin/bash

PKG_NAME=""
PKG_NAME=`echo "console.log(require('./package.json').name)" | node`

if [ -n "$PKG_NAME" ]
then
	echo "Package naming check OK."
else
	echo "Could not determine package name."
	exit 1
fi

VERSION=""
VERSION=`echo "console.log(require('./package.json').version)" | node`

if [ -n "$VERSION" ]
then
	echo "Version check OK."
else 
	echo "Could not determine package version."
	exit 1
fi


echo "Building $PKG_NAME version $VERSION..." 
sh ./scripts/build.sh
if [ "$?" -eq "0" ]
then
  echo "Build complete."
else
  echo "Build failed."
  exit 1
fi

echo "Publishing..." 
sh ./scripts/publish.sh
if [ "$?" -eq "0" ]
then
  echo "Publishing complete."
else
  echo "Publishing failed."
  exit 1
fi

echo "Cleaning up..."
rm -f ./build.log &> /dev/null
exit 0