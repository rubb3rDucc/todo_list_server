FROM node:18.0.0

# RUN apk add --no-cache

# RUN apt-get update && apt-get install -y nodejs npm           

RUN mkdir -p /app

WORKDIR /app
# RUN cd /app

COPY package.json package.json
COPY package-lock.json package-lock.json
# RUN npm cache clean --force
# RUN npm install -g npm@10.2.5
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]
# CMD [ "npm", "start"]