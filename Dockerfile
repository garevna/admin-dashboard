FROM node:14-bullseye-slim
WORKDIR /usr/src/app

COPY . .

RUN yarn install
RUN yarn build

# Copy from VueJS Build Stage dist folder to nginx (production-stage)
FROM nginx:1.17-alpine as production-stage

COPY --from=build-stage /usr/app/dist /usr/share/nginx/html

ENV TINI_VERSION v0.19.0
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini-amd64 /tini
RUN chmod +x /tini

ENTRYPOINT ["/tini", "--"]

# CMD ["yarn", "build"]

CMD ["nginx", "-g", "daemon off;"]
