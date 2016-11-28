FROM node

MAINTAINER Jason Jones

RUN useradd --user-group --create-home --shell /bin/false app
ENV HOME=/home/app

COPY *.json index.html styles.css systemjs.config.js app/ api/ $HOME/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/
RUN npm install

CMD ["npm", "start"]
