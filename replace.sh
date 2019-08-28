#!/bin/sh

# change server url
for entry in ${SOURCE_DIR}/js/*.js
do
  sed -e "s#\"http://replace:me\"#${FLOWCI_API_URL}#g" "${entry}" > "${entry}".replaced
  echo "${entry} is ready"
done

# copy to caddy work folder
cp -r ${SOURCE_DIR} ${CADDY_DIR}

# write back to .js from .js.replaced
for entry in ${CADDY_DIR}/js/*.replaced
do
  name=${entry%.replace}
  mv ${entry} ${name}
  rm ${entry}
done
