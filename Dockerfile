FROM    centos:centos6

# Enable Extra Packages for Enterprise Linux (EPEL) for CentOS
RUN     yum install -y epel-release
# Install Node.js and npm
RUN     yum install -y nodejs npm

# Install app dependencies
COPY src/package.json /src/package.json
COPY src/index.js /src/index.js
ADD src/dist/ /src/dist
RUN cd /src; npm install --production

# Bundle app source
COPY . /src

EXPOSE  8080
CMD ["node", "/src/index.js"]
