FROM alpine:3.18
ENV NODE_VERSION 21.6.1
RUN apk add --no-cache
RUN apk update && \
    apk add nodejs \
    npm           
RUN mkdir -p /app
WORKDIR /app
# RUN cd /app
COPY package.json package-lock.json 
# RUN npm cache clean --force
# RUN npm install -g npm@10.2.5
# RUN npm install
EXPOSE 3000
CMD [ "npm", "start"]