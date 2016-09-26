FROM mongo

MAINTAINER Jason Jones

COPY data-seed.json /data/data-seed.json

VOLUME ["/data/db"]
WORKDIR /data

EXPOSE 27017

ENTRYPOINT ["mongod"]
