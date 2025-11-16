# Multi-stage build for optimized production image
# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (production + dev dependencies for build)
RUN npm ci --only=production=false --no-optional && \
    npm cache clean --force

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Production image with nginx
FROM nginx:alpine

# Update system packages for security
RUN apk update && apk upgrade && \
    apk add --no-cache curl && \
    rm -rf /var/cache/apk/*

# Copy built application
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
