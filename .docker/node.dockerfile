FROM node

MAINTAINER Jason Jones

RUN useradd --user-group --create-home --shell /bin/false api
ENV HOME=/home/api

COPY api/ $HOME/
RUN chown -R api:api $HOME/* $HOME/.eslintrc.json $HOME/.config

USER api
WORKDIR $HOME/
RUN npm install

CMD ["npm", "start"]
