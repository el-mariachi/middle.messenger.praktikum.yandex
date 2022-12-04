FROM node:18.12.1-buster-slim

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

ENV PORT=3000

EXPOSE ${PORT}

CMD [ "node", "dist/server.js" ]
