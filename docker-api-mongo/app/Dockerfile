# Specify the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose a port (if required)
EXPOSE 3001

# Specify the command to run the application
CMD ["npm", "run", "dev"]