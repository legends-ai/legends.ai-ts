#!/usr/bin/env bash

ROOT=$(dirname $0)/..
SCHEMA=$ROOT/schema.graphql

echo "Pulling relay schema..."
curl http://helios.dev.asuna.io/render-schema > "$SCHEMA"
echo "Done."