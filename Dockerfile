# Use Node 18
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --production

# Bundle app source
COPY . .

# Set environment variables (can be overridden by docker-compose)
ENV PORT=3002
ENV NODE_ENV=production

EXPOSE 3002

# Start the server
CMD [ "node", "index.js" ]
