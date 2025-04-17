# Use lightweight Node.js image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy all source files
COPY . .

# Expose port 3000 for the service
EXPOSE 3000

# Start the Node.js app
CMD ["node", "app.js"]
