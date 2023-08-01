FROM node:18.15.0 as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

COPY .env ./


RUN npm ci

COPY . .

RUN npm run build

FROM node:18.15.0-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

COPY .env ./

RUN npm ci --production

COPY --from=builder /usr/src/app/dist ./dist

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 3000

CMD [ "node", "dist/main.js" ]