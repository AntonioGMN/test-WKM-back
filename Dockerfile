FROM node:16

WORKDIR /app

COPY package.json package-lock.json /app/

COPY prisma ./prisma/

COPY .env ./

COPY . /app/

RUN npm install

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "start"]


