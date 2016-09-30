#!/bin/sh

docker exec mongo-sandbox mongoimport --db test --collection users --drop --type json --file  seed-data.json --jsonArray
