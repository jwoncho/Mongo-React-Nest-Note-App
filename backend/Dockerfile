# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm install

# Bundle app source
COPY . .

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Set environment variable to development (optional, depending on your app)
ENV NODE_ENV development

# Run the app in development mode (change the script as per your package.json)
CMD ["npm", "run", "start:dev"]
