FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV PORT=83
EXPOSE 83
CMD ["node", "app.js"]
