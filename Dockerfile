FROM node:lts-alpine

WORKDIR /app
COPY . ./
RUN npm install
RUN npm build
EXPOSE 4173


CMD ["npm", "run", "preview"]