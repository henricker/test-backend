#This dockerfile is used to deploy on kubernetes

FROM node:16-alpine

WORKDIR /usr/src/app
COPY ../package*.json ./
RUN npm install
COPY .. .
RUN npm run build
RUN npm run migrate:run
RUN npx prisma generate

USER node

CMD [ "npm", "run", "start:prod" ]

