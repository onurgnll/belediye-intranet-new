
FROM node:16-alpine
WORKDIR /admin
COPY . .
RUN npm install
EXPOSE 5173
CMD npm run build; npm run preview