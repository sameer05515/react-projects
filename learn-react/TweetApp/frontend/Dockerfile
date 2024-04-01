# Use an official Node runtime as the base image
FROM node:lts-buster-slim AS development

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the entire project to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose port 3002 to the outside world
EXPOSE 3002

# Command to run the application
CMD ["npm", "start"]
