# # Use the official Node.js image from the Docker Hub
# FROM node:latest

# # Set the working directory in the container
# WORKDIR /app/frontend

# # Copy package.json and package-lock.json into the container at /app
# COPY package*.json ./

# # Install the dependencies including axios
# RUN npm install axios

# # Install the rest of the dependencies
# RUN npm install

# # Copy the rest of the application code into the container at /app
# COPY . .

# # Environment Variables from .env file


# # Expose the port the app runs on
# EXPOSE 3000

# # Specify the command to run on container start
# CMD ["npm", "start"]
