FROM node:14-alpine

RUN apk add --no-cache bash

USER node

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npm run migrate:run
RUN npm run seed