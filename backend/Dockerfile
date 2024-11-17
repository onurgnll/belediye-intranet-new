FROM node:20
WORKDIR /app
COPY . .
RUN npm install --production --legacy-peer-deps
RUN npm install -g sequelize-cli
EXPOSE 5000
#RUN npx sequelize-cli db:migrate
#RUN npx sequelize-cli db:seed:all
#CMD [ "npm", "run", "prod" ]
CMD npx sequelize-cli db:migrate --env production; npm run prod
#CMD npx sequelize-cli db:drop;npx sequelize-cli db:create;npx sequelize-cli db:migrate --env production ; npx sequelize-cli db:seed:all; npm run prod