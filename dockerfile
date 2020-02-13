FROM ubuntu:18.04 AS yarn_builder

ARG ARTIFACTORY_USER
ARG ARTIFACTORY_NPM_SECRET

ENV ARTIFACTORY_USER=$ARTIFACTORY_USER
ENV ARTIFACTORY_NPM_SECRET=$ARTIFACTORY_NPM_SECRET

RUN apt-get update \
    && apt-get install -y curl gnupg2 \
    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash

RUN export NVM_DIR="$HOME/.nvm" && \. $NVM_DIR/nvm.sh && \. $NVM_DIR/bash_completion && nvm install 10 \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y yarn

WORKDIR /app
ADD ./ .

RUN yarn install --frozen-lockfile --network-timeout 1000000 || yarn install --frozen-lockfile --network-timeout 1000000 \
    && yarn lint --fix \
    && yarn test:unit \
    && yarn build


FROM nginx:stable-alpine

COPY ./build/deploy/default.conf /etc/nginx/conf.d
COPY ./build/httppass/.htpasswd /etc/nginx
COPY --from=yarn_builder /app/dist /usr/share/nginx/html
