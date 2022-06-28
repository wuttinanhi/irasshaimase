FROM node:lts-alpine as build_module_install
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "yarn.lock", "./"]
RUN yarn install --silent

FROM build_module_install as build_stage
COPY . .
RUN yarn build

FROM node:lts-alpine as production_module_install
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "yarn.lock", "./"]
RUN yarn install --production --silent

FROM production_module_install as production
ENV NODE_ENV=production
COPY --from=build_stage /app/dist /app/dist
RUN chown -R node /app
EXPOSE 3000
USER node
CMD ["node", "dist/main"]
