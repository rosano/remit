#!/bin/bash

# ensure that this file executable in the app repo: chmod +x start.sh.

exec /usr/local/bin/gosu cloudron:cloudron npm start
