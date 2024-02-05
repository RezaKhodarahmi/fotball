# pull official base image
FROM node:20-alpine

# set working directory
WORKDIR /usr/app

# add app
COPY . .

RUN npm install

RUN npm run build

# start app
CMD npm run serve

EXPOSE 4001