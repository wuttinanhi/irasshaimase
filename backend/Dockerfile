FROM node:lts-alpine as node_modules_install
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "yarn.lock", "./"]
RUN yarn install --production --silent

FROM node_modules_install as production
ENV NODE_ENV=production
COPY . .
EXPOSE 3000
RUN chown -R node /app
USER node
CMD ["npm", "run", "prod"]
