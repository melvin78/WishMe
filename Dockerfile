FROM node:lts-alpine

WORKDIR /app
COPY . ./
ARG VITE_BASE_URL=${VITE_BASE_URL}
RUN npm install
RUN npm run build
EXPOSE 4173


CMD ["npm", "run", "preview"]