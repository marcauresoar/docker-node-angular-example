# Use image with nodejs
FROM node:slim

# Create app directory
WORKDIR /usr/src/app

# Copy source files and install app dependencies
ADD ./src/ ./
RUN npm install

EXPOSE 4200
CMD [ "npm", "start" ]
