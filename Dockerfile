FROM node:lts-alpine

WORKDIR /app
COPY . ./
RUN npm install

CMD ["npm", "run", "build", "--", "--host", "0.0.0.0"]