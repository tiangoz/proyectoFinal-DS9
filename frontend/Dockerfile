FROM node:16-alpine

WORKDIR /src

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "frontServer.js"]