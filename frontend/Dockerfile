FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm config set registry https://registry.npmjs.org/ \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000

RUN npm install tailwindcss || \
    (sleep 1 && npm install tailwindcss) || \
    (sleep 2 && npm install tailwindcss) || \
    (sleep 3 && npm install tailwindcss)

RUN npm install -g npm@latest && npm install

COPY . .

RUN npm run build

# Command to run the application
CMD ["npm", "run", "start"]