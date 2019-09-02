#!/usr/bin/env bash

version=$1

if [[ -n ${version} ]]; then
  VersionTag="-t flowci/web:$version"
fi

npm run build
docker build -f ./Dockerfile -t flowci/web:latest $VersionTag .