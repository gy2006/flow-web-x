From flowci/web-base:latest

ENV TARGET_DIR=/usr/share/nginx/html
ENV SOURCE_DIR=/root/flow-web-x

WORKDIR $SOURCE_DIR

RUN mkdir -p $SOURCE_DIR

COPY . $SOURCE_DIR

RUN rm -rf $SOURCE_DIR/node_modules

CMD npm install && npm run build && cp -r $SOURCE_DIR/dist/* $TARGET_DIR && nginx -g 'daemon off;'
