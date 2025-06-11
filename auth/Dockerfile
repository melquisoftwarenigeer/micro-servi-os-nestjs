FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Gere os arquivos do Prisma
RUN npx prisma generate

# Compile o projeto
RUN npm run build

CMD ["node", "dist/main"]
