FROM node:18-alpine as dependencies
WORKDIR /app
COPY package.json .env ./

RUN yarn install
RUN yarn add sharp

FROM node:18-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn add next@14.1.4
RUN yarn build

FROM node:18-alpine as runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000
CMD ["yarn", "start"]