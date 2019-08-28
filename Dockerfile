FROM abiosoft/caddy:1.0.3

ENV CADDY_DIR=/srv
ENV SOURCE_DIR=/www/flow-web-x
ENV FLOWCI_API_URL=http://127.0.0.1:8080

RUN mkdir -p $SOURCE_DIR

COPY dist $SOURCE_DIR
COPY replace.sh $SOURCE_DIR

WORKDIR $SOURCE_DIR

CMD ./replace.sh && caddy -conf /etc/Caddyfile
