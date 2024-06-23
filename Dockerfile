# Base da imagem - Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json para o container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o código da aplicação para o container
COPY . .

# Define a porta de exposição (opcional)
EXPOSE ${PORT}

# Comando para executar a aplicação
CMD ["npm", "run", "start:dev"] 