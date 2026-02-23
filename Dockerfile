# Étape 1 : Build
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Étape 2 : Serveur NGINX
FROM nginx:alpine

# Copie des fichiers buildés vers nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copie d'une config nginx personnalisée (facultatif)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]