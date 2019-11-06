FROM node:10.15.3

MAINTAINER Sateesh H

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node
RUN npm install
COPY --chown=node:node . .

#RUN npm config set unsafe-perm true

EXPOSE 3001

CMD ["npm", "start"]