FROM node:12

LABEL maintainer="Alexander Bartolomey"

WORKDIR /

COPY package*.json ./

RUN yarn install

COPY . .

VOLUME [ "/static" ]

ENTRYPOINT [ "cat", "/static/config.json" ]

CMD ["npm", "start"]