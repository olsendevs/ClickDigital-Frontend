# Define a imagem base que usaremos para o contêiner (Node.js com Nginx)
FROM node:14 as build-stage

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o package.json e o package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências da aplicação
RUN npm install

# Copiar todos os arquivos do diretório atual (que contém a aplicação React) para o diretório de trabalho no contêiner
COPY . .

# Compilar os arquivos da aplicação React
RUN npm run build

# Stage de produção
FROM nginx:latest

# Copiar os arquivos de build do React do estágio anterior para o diretório de publicação padrão do Nginx
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expor a porta 80 do contêiner
EXPOSE 80

# O comando de inicialização do Nginx será executado automaticamente ao iniciar o contêiner
CMD ["nginx", "-g", "daemon off;"]
