FROM node:lts-alpine as build-stage

MAINTAINER Flammenmensch<maleventum@gmail.com>

ARG MICROSERVICE

WORKDIR /app

RUN npm i -g nodemon

COPY dist/apps/$MICROSERVICE/package.json /app

RUN npm i --production

COPY dist/apps/$MICROSERVICE/ /app

EXPOSE 3000

CMD [ "nodemon", "main.js" ]
