# Start from the official Node.js LTS Bookworm slim image (newer, more secure)
FROM node:lts-bookworm-slim

# Update system packages and install security patches
RUN apt-get update && apt-get upgrade -y && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set and create app directory
WORKDIR /app

# Install dependencies only when needed
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-optional

# Create non-root user for better security
RUN groupadd -r nodejs && useradd -r -g nodejs nodejs

# Copy application source (everything except what's in .dockerignore)
COPY --chown=nodejs:nodejs . .

# Switch to non-root user
USER nodejs

# Expose the port your app runs on (if using 3003)
EXPOSE 3003

# Set environment variables for production (optional)
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
