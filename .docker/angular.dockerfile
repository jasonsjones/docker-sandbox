# create image based on the official Node image from dockerhub
FROM node
RUN useradd --user-group --create-home --shell /bin/false client
ENV HOME=/home/client

# copy dependency definitions
COPY client/ $HOME/

RUN chown -R client:client $HOME/*

USER client
WORKDIR $HOME/
RUN npm install

CMD ["npm", "start"]
