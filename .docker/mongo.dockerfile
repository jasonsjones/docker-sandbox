FROM mongo

MAINTAINER Jason Jones

COPY scripts/seed-data.json /data/seed-data.json

VOLUME ["/data/db"]
WORKDIR /data

EXPOSE 27017

ENTRYPOINT ["mongod"]
