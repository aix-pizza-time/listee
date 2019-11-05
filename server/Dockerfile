FROM node:alpine

LABEL maintainer="Alexander Bartolomey"

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["npm", "start"]