FROM node:lts-alpine

MAINTAINER Flammenmensch<maleventum@gmail.com>

LABEL Partituras GraphQL API

WORKDIR /app

COPY ./dist/apps/graphql-api .

COPY ./proto ./proto

RUN npm i --production

RUN npm i @grpc/proto-loader

RUN ls -la /app

CMD node ./main.js
