FROM node:22

WORKDIR /usr/src/app

# Install necessary dependencies for Puppeteer and Chromium
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-glib-1-2 \
    libgtk-3-0 \
    lsb-release \
    xdg-utils \
    libnss3 \
    libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Install Chromium manually
RUN apt-get update && apt-get install -y chromium

# Set the environment variable for Puppeteer to skip downloading Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Copy the package.json and package-lock.json files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy tsconfig.json and source code
COPY tsconfig.json ./
COPY src ./src

# Build the project
RUN npm run build

# Copy the built code
COPY dist ./dist

# Expose the application port
EXPOSE 8000

# Use the built version to run the app
CMD ["node", "./dist/app.js"]
