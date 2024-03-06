FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY schema.zmodel prisma ./

RUN yarn zenstack generate

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]