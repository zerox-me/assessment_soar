# Build stage
FROM node:20-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
# This helps in leveraging Docker cache for dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Build the React app for production
RUN npm run build

# Production stage
FROM nginx:latest

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration if you have custom config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
