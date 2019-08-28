#!/usr/bin/env bash

npm run build
docker build -f ./Dockerfile -t flowci/web:latest .