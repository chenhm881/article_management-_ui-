from nginx:1.20.0-alpine
copy build /usr/share/nginx/html
run rm /etc/nginx/conf.d/default.conf
copy nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
cmd ["nginx", "-g", "daemon off;"]
