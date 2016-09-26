FROM node

MAINTAINER Jason Jones

RUN npm install nodemon -g

COPY . /src

WORKDIR /src

CMD ["npm", "start"]
