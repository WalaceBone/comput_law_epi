# ----- BUILDER -----

FROM node:alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install || (cat /root/.npm/_logs/*.log && exit 1)
COPY . .
RUN npm run build

# ----- PRODUCTION -----

FROM nginx:1.17-alpine as production

COPY --from=builder /usr/src/app/dist/web /usr/share/nginx/html

EXPOSE 80
