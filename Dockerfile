FROM node:carbon
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install --only=prod
# Copy app source code
COPY . .
#Expose port and start application
EXPOSE 8000
CMD [ "npm", "start" ]