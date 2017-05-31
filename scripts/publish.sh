#!/bin/bash

npm update

VERSION=`echo "console.log(require('./package.json').version)" | node`

npm install
git add dist/* -f
git add bower.json -f

git commit -m "v$VERSION"

git tag v$VERSION -f
git push origin --tags -f
