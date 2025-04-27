FROM node:18

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm install

# Then copy the rest of the application
COPY . .

EXPOSE 4000

CMD ["sh", "-c", "npm run seed && npm start"]