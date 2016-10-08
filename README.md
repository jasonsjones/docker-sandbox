# Docker Sandbox App

A sandbox to explore how to implement a simple node.js & mongodb web application running exclusively in docker containers

### Development

To build the project for development, run:

```
docker-compose build
```
This will build the node image and the mongo image as described by the
respective dockerfiles in `./docker`

To start the app, run:

```
docker-compose up
```

If you would like to start the app running in daemon mode, run:

```
docker-compose up -d
```

If the app is running (not in daemon mode), you can stop it by hitting Ctrl-C from within the running terminal.  Once stopped, you can stop the running containers within

```
docker-compose stop
```

### Production

// TODO
