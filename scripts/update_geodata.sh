#!/usr/bin/env bash

ROOT=$(dirname $0)/..
GEODATA=$ROOT/geodata/

if [ ! -d $GEODATA ]; then
  tar xzvf <(curl http://geolite.maxmind.com/download/geoip/database/GeoLite2-Country.tar.gz) -C $ROOT && \
    mv GeoLite* $GEODATA
else
  echo "Geodata already downloaded."
fi
