# Use the Node.js 20 base image
FROM node:20-alpine


WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the Vite development server port
EXPOSE 5173

# Command to start the development server
CMD ["npm", "run", "dev"]
