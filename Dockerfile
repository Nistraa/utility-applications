FROM node:18

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

COPY src/views ./dist/views

RUN mkdir -p ./dist/services/uploads

EXPOSE 3000

CMD ["node", "dist/index.js"]