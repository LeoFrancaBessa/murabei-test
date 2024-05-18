# Use uma imagem base do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY codes/package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código do seu aplicativo para o diretório de trabalho
COPY codes/ .

# Define a variável de ambiente para produção
ENV NODE_ENV=production

# Compila o projeto Next.js
RUN npm run build

# Expõe a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar o servidor Next.js
CMD ["npm", "start"]