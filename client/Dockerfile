# 1st stage: build client JS with webpack
# This heavily relies on cached layers to run quick,
# therefore we use a builder pattern
FROM node:latest as builder

LABEL maintainer="Alexander Bartolomey"

COPY /package*.json .

RUN yarn install

COPY / .

RUN yarn run build

# 2nd stage: static nginx alpine image
FROM nginx:alpine

LABEL maintainer="Alexander Bartolomey"

COPY nginx.conf /etc/nginx/conf.d/pizzabot.conf

RUN nginx -t

COPY --from=builder /dist /usr/share/nginx/html