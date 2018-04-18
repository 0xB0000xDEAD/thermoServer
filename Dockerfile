FROM node:carbon

# Create app directory
WORKDIR /top
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn install
# If you are building your code for production
# RUN npm install --only=production
# RUN npm install --only=production
# Bundle app source
COPY . .

EXPOSE 9000
CMD [ "yarn", "run", "dev-debug" ]