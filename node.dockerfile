FROM node

MAINTAINER Jason Jones

COPY package.json *.js views/ /src/

WORKDIR /src

RUN npm install nodemon -g && npm install

CMD ["npm", "start"]
