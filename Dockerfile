FROM node:lts-alpine

WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build
EXPOSE 4173
ARG VITE_BASE_URL=${VITE_BASE_URL}

CMD ["npm", "run", "preview"]