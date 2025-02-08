# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.10.0
FROM node:${NODE_VERSION}

ENV YARN_VERSION=1.22.21
RUN yarn policies set-version $YARN_VERSION

WORKDIR /usr/src/template

RUN apt-get clean && apt-get update && apt-get install -y \
    git \
    ruby ruby-dev ruby-bundler \
    bash unzip libc6 \
    build-essential

EXPOSE 9000
ENV REACT_NATIVE_PACKAGER_HOSTNAME="192.255.255.255"

CMD yarn && yarn start
