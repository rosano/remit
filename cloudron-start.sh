#!/bin/bash

# ensure that this file executable in the app repo: chmod +x start.sh.

if [[ ! -f /app/data/.env ]]; then
	cp .env-sample /app/data/.env
fi

set -o allexport
source /app/data/.env
set +o allexport

mkdir -p /app/data/__download
chown -R cloudron:cloudron /app/data/__download/

exec /usr/local/bin/gosu cloudron:cloudron npm start
