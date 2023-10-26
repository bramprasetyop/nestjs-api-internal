# Base image
FROM node:14.17.0

# Set working directory inside container
WORKDIR /usr/src/app

# Copy and install dependencies inside container
COPY . .

RUN ls -lah
RUN yarn cache clean
#RUN yarn install --network-concurrency 2
RUN yarn install

RUN yarn run prebuild
RUN yarn run build


# Expose running port inside container
EXPOSE 8080

# Run server
CMD [ "yarn", "start:prod" ]
