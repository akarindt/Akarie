# Build phase
FROM node:18-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve phase
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy Nginx config
COPY .nginx/nginx.conf /etc/nginx/nginx.conf

# Remove default Nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/build .

# Run Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
