FROM node:18-slim

WORKDIR /app

# Copy package files from the frontend folder
COPY package*.json ./
RUN npm install

# Copy all frontend code
COPY . .

EXPOSE 5173

# Host 0.0.0.0 is required for Docker to expose the port
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]