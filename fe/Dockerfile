FROM node:20-alpine AS development
ENV TZ="Asia/Jakarta"
RUN apk add openssl

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma/ ./prisma/
COPY yarn*.lock ./

#RUN npm install glob rimraf
RUN yarn global add rimraf --ignore-engines

#RUN npm install --only=development
RUN yarn install --production=false

COPY . .

# RUN npm run build
RUN yarn run build

FROM node:20-alpine as production
ENV TZ="Asia/Jakarta"
RUN apk add openssl

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma/ ./prisma/
COPY yarn*.lock ./

#RUN npm install --only=production
RUN yarn install --production=true

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]