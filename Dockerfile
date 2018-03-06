FROM node:8

MAINTAINER Pat Nolan <pat@deltareadytechnology.com.au>

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PORT 9000
ENV TINI_VERSION v0.16.1

RUN apt-get update \
    && apt-get install -y apt-transport-https \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y yarn

# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
# Handling Kernel Signals
# Add Tini
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /sbin/tini

WORKDIR /home/node/app

COPY ./ .

RUN chmod +x /sbin/tini \
    && chown -R node:node /home/node

USER node

RUN yarn

# EXPOSE won't be observed in a Heroku Deployment scenario. The $PORT env variable must be supplied instead
EXPOSE 9000

ENTRYPOINT ["/sbin/tini", "--" ]

CMD ["yarn", "start"]
