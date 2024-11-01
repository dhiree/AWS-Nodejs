# docker/Dockerfile

# Use Node 10 Alpine as the base image
FROM node:10-alpine

# Create app directory and set permissions for node user
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Set the working directory
WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Switch to non-root user
USER node

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY --chown=node:node . .

# Expose the port the app runs on
EXPOSE 8080

# Start the app
CMD [ "node", "server.ts" ]
