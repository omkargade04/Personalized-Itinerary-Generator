FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

COPY dist ./dist

EXPOSE 8000

CMD ["node", "./dist/app.js"]
