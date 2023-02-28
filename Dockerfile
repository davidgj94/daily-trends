## Stage one: where the app is built
FROM node:18.13 AS builder
WORKDIR /usr

# We copy the necessary files to build our project
COPY . .

# We build our project
RUN ls -a
RUN npm ci
RUN npm run build

## Stage two: where the app actually runs
FROM node:18.13 AS runner
WORKDIR /usr
COPY . .
RUN npm i --production

EXPOSE 3000

# Here we copy all of our dist folder to the docker image
COPY --from=builder /usr/dist ./dist