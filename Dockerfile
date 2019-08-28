FROM abiosoft/caddy:1.0.3

ENV TARGET_DIR=/srv

WORKDIR $TARGET_DIR

ENV FLOWCI_API_URL="127.0.0.1:8080"

COPY dist $SOURCE_DIR
COPY replace.sh $SOURCE_DIR

CMD ./replace.sh && caddy -conf /etc/Caddyfile
