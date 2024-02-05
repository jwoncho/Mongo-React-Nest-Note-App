# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Expose port 3000 to be accessible externally
EXPOSE 3000

# Set environment variable to development (optional, depending on your app)
ENV NODE_ENV development

# Start app in development mode with hot-reloading
CMD ["npm", "start"]
