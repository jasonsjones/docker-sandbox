#!/bin/sh

# $ ./seed_db.sh <myMongo|mongo-sandbox>

docker exec $1 mongoimport --db dbContainer --collection users --drop --type json --file  seed-data.json --jsonArray
