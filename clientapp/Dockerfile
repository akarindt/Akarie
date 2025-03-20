# Build phase
FROM node:latest AS nodebuild
WORKDIR /tmp/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve phase
FROM nginx:latest AS nginxbuild
COPY nginx.conf /etc/nginx/nginx.conf
COPY robots.txt /usr/share/nginx/html
COPY --from=nodebuild /tmp/app/dist /usr/share/nginx/html
COPY --from=nodebuild /tmp/app/cert /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]