FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV PORT=38204
EXPOSE 38204
CMD ["node", "app.js"]
