FROM node

MAINTAINER Jason Jones

COPY package.json api/ /src/

WORKDIR /src

RUN npm install nodemon -g && npm install

CMD ["npm", "start"]
