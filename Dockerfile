FROM node:16-alpine 
WORKDIR /app
COPY ./build ./build
COPY package*.json .
ENV PORT=4008
RUN npm install
CMD [ "npm", "start" ]