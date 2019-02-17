FROM node:6.2

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY ./vue-admin-template/package.json ./

# install project dependencies
# RUN npm install
