FROM node:18-alpine

WORKDIR /app

# Install dependencies first (cache)
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

ENV PORT=5000
EXPOSE 5000

CMD ["node", "server.js"]
