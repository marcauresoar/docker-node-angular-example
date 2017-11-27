# Use image with nodejs
FROM node:slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY src/package.json ./
RUN mkdir ./uploads
RUN npm install

# Bundle app source
COPY ./src .

EXPOSE 8080
CMD [ "npm", "start" ]
