FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Adiciona as migrações ao container
COPY prisma ./prisma

RUN npx prisma generate

CMD ["./entrypoint.sh"]
