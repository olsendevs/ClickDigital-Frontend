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

# Instalar o Certbot e os utilitários de gerenciamento de certificados SSL
RUN apt-get update && \
    apt-get install -y certbot python3-certbot-nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Adicionar configuração do Nginx para SSL
COPY nginx.conf /etc/nginx/nginx.conf

# Expor as portas 80 (HTTP) e 443 (HTTPS) do contêiner
EXPOSE 80
EXPOSE 443

# O comando de inicialização do Nginx será executado automaticamente ao iniciar o contêiner
CMD ["nginx", "-g", "daemon off;"]
