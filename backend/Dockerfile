FROM node:18

WORKDIR /app

# 1) Install dependencies
COPY package*.json ./
RUN npm install

# 2) Copy the rest and generate Prisma client
COPY . .
RUN npx prisma generate

# 3) Apply migrations in production & seed initial data
RUN npx prisma migrate deploy
RUN node prisma/seed.js

# 4) Expose and start
EXPOSE 4000
CMD ["npm", "start"]
