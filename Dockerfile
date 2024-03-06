FROM node:18-alpine

RUN apk --no-cache add --virtual .builds-deps build-base python3

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY schema.zmodel prisma ./

RUN yarn zenstack generate

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]