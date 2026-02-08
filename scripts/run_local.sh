#!/usr/bin/env bash
PORT=8000
HOST=0.0.0.0

cd "$(dirname "$0")/.." || exit 1

echo "Starting simple HTTP server at http://localhost:${PORT}"
python3 -m http.server ${PORT} --bind ${HOST} &
PID=$!

open "http://localhost:${PORT}/index.html"

trap "echo 'Stopping server...'; kill ${PID}; exit 0" INT TERM
wait ${PID}
