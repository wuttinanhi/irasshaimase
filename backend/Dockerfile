FROM node:lts-alpine as build_module_install
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "yarn.lock", "./"]
RUN yarn install --silent



FROM build_module_install as build_stage
COPY . .
RUN yarn build



FROM node:lts-alpine as production_puppeteer_install
# Make puppeteer work in the container
# Running on Alpine
# https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-on-alpine
# Installs latest Chromium (100) package.
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Puppeteer v13.5.0 works with Chromium 100.
RUN yarn add puppeteer@13.5.0

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app



FROM production_puppeteer_install as production_module_install
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "yarn.lock", "./"]
RUN yarn install --production --silent



FROM production_module_install as production
ENV NODE_ENV=production
COPY --from=build_stage --chown=pptruser /app/dist /app/dist
COPY --chown=pptruser ./template /app/template
RUN mkdir -p /app/output && chown -R pptruser:pptruser /app/output
USER pptruser
EXPOSE 3000
CMD ["node", "dist/main"]
