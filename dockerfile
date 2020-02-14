FROM nginx:stable-alpine

COPY ./build/deploy/default.conf /etc/nginx/conf.d
COPY ./build/httppass/.htpasswd /etc/nginx
COPY ./dist /usr/share/nginx/html
