FROM nginx:1.15

COPY build/ /usr/share/nginx/html/nastushenka
COPY nginx.conf /etc/nginx/nginx.conf
