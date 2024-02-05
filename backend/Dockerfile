# Fetching the minified node image on apline linux
FROM node:20-alpine

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR /usr/app

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Installing pm2 globally
RUN npm install pm2 -g

# Starting our application

CMD ["pm2-runtime", "app.js"]

# Exposing server port
EXPOSE 5000