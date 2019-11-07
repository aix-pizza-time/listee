FROM node:12

LABEL maintainer="Alexander Bartolomey"

WORKDIR /

COPY package*.json ./

RUN yarn install

COPY . .

RUN ls ./static

CMD ["npm", "start"]