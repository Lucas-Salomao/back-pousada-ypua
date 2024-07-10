# Base da imagem - Node.js
FROM node:18-alpine

ENV HOST 0.0.0.0

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o código da aplicação para o container
COPY . .

# Instala as dependências
RUN npm install

# Define a porta de exposição (opcional)
EXPOSE 3000

# Comando para executar a aplicação
CMD ["npm", "run", "start:dev"] 