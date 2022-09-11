FROM node:16

EXPOSE 3000

ARG BUILD_VERSION
ARG BUILD_TIMESTAMP
ARG BUILD_GIT_SHA

RUN apt update
RUN apt install -y vim telnet

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

# Expose time of build and HEAD (Git sha) as environment variables for traceability.
ENV BUILD_VERSION=$BUILD_VERSION
ENV BUILD_TIMESTAMP=$BUILD_TIMESTAMP
ENV BUILD_GIT_SHA=$BUILD_GIT_SHA

CMD ["npm", "start"]