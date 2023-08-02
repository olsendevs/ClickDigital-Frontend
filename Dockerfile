# Stage de desenvolvimento
FROM node:14 as development-stage

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o package.json e o package-lock.json (ou yarn.lock) para o diretório de trabalho no contêiner
COPY package*.json ./

# Instalar as dependências da aplicação
RUN npm install

# Copiar todos os arquivos do diretório atual (que contém a aplicação React) para o diretório de trabalho no contêiner
COPY . .

# Definir a porta em que o React será executado (opcional, mas pode ser útil para fins de documentação)
EXPOSE 3000

# Executar o aplicativo React
CMD ["npm", "start"]
