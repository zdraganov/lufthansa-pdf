FROM node:10.15.3

COPY package*.json /

RUN npm install
COPY . .

EXPOSE 8088

ENTRYPOINT ["npm", "start"]

