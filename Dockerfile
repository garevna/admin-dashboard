FROM node:14-alpine as build-stage
# WORKDIR /usr/src/app

WORKDIR /usr/app

COPY . .

RUN yarn install
RUN yarn build

# Copy from VueJS Build Stage dist folder to nginx (production-stage)

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /usr/app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# ENV TINI_VERSION v0.19.0
# ENV PATH /usr/src/app/node_modules/.bin:$PATH
# ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini-amd64 /tini
# RUN chmod +x /tini

# ENTRYPOINT ["/tini", "--"]

# CMD ["yarn", "prod"]
