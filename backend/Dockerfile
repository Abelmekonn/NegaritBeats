# Backend Dockerfile
# Use the official Node.js image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port for the backend (adjust if necessary)
EXPOSE 5000

# Set the environment variables (replace with your actual values)
ENV CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
ENV CLOUDINARY_API_KEY=your-cloudinary-api-key
ENV CLOUDINARY_API_SECRET=your-cloudinary-api-secret
ENV MONGO_URI=mongodb://mongo:27017/musicapp

# Start the Node.js app
CMD ["npm", "start"]
