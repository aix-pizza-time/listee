FROM node:12

LABEL maintainer="Alexander Bartolomey"

WORKDIR /

COPY package*.json ./

RUN yarn install

COPY . .

VOLUME [ "/static" ]

CMD ["npm", "start"]