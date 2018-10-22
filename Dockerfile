From flowci/web-base:latest

ENV TARGET_DIR=/usr/share/nginx/html

WORKDIR $TARGET_DIR

COPY dist $SOURCE_DIR
COPY replace.sh $SOURCE_DIR

CMD ./replace.sh && nginx -g 'daemon off;'
