FROM node:18-alpine

WORKDIR /app

COPY codes/package*.json ./

RUN npm install

COPY codes/ .

ENV NODE_ENV=production

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]