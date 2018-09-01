FROM nginx:1.15

RUN  mkdir /usr/share/nginx/html/performer
COPY build/ /usr/share/nginx/html/performer/
COPY nginx.conf /etc/nginx/nginx.conf
