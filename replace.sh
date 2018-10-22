#!/usr/bin/env bash

#To replace FLOWCI_API_URL to url
for entry in ${TARGET_DIR}/static/js/*
do
  sed -e "s#\"http://replace:me\"#${FLOWCI_API_URL}#g" ${entry} > ${entry}.tmp
  mv ${entry}.tmp ${entry}
  echo "${entry} is ready"
done
