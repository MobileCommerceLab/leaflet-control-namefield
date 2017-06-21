#!/bin/bash

npm update

VERSION=""
VERSION=`echo "console.log(require('./package.json').version)" | node`

if [ -n "$VERSION" ]
then
	echo "Version check OK."
else 
	echo "Could not determine package version."
	exit 1
fi

npm install
git add dist/* -f
git add bower.json -f

git commit -m "v$VERSION"

git tag v$VERSION -f
git push origin --tags -f
