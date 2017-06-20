#!/bin/sh

mkdir -p dist

browserify src/index.js -t browserify-shim -t es3ify --standalone leaflet-control-namefield | derequire >dist/Control.NameSelector.js
cp -a Control.NameSelector.css images/ dist/