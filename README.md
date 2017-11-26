# Docker + Node + Angular example

This repository offers an example of an application using Docker, NodeJs and AngularJs 5 technologies.
The application is composed by two environments:
* Server: a RESTful server using NodeJS and Express.
* Client: an Angular JS web page, that consumes and interacts with the server.

## Pre requirements

You need to have installed the following tools:
* docker and docker-compose
* npm

## Build and run

In order to build the project, you have to run the command below in the root directory of the project:

```
$ docker-compose up -d
```

This will start two containers, one with the server and other with the client:

 - **Server:** http://localhost:49160/
 - **Client:** http://localhost:49161/
