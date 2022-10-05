FROM node:lts-alpine

WORKDIR /app
COPY . ./
RUN npm install
EXPOSE 4173


CMD ["npm", "run", "preview"]