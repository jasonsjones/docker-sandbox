#!/bin/sh

# check # of running conatainers
# docker info | grep Running | awk '{ print $2 }'

if [ -n $(docker ps -a -q) ]; then
    echo "no docker containters are present"
else
    echo "docker conatainers are still present and need to be dealt with..."
    docker rm $(docker ps -a -q)
fi

docker build -f mongo.dockerfile --rm -t mongo-sandbox .
docker build -f node.dockerfile --rm -t sandbox .

IMAGES=$(docker images -f 'dangling=true' -q)
echo $IMAGES

if [ -n "$IMAGES" ]; then
    echo "We have orphaned images...."
    docker rmi $IMAGES
fi

docker run -d --name myMongo -v $(pwd)/data/db:/data/db mongo-sandbox

if [ "$1" = "seed" ]; then
    echo "We are going to seed the database now..."
    sh $(pwd)/scripts/seed_db.sh myMongo
fi

docker run --rm -p 3000:3000 --link myMongo:mongo -v $(pwd):/src sandbox
