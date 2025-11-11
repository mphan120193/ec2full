# Use a stable Node.js version (not Alpine)
FROM node:18

# Set the working directory
WORKDIR /backendDir

# Copy package.json before installing dependencies
COPY package.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Set the default command
CMD ["node", "server.js"]
