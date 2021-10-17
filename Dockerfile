FROM node:14-bullseye-slim
WORKDIR /usr/src/app

COPY . .

RUN yarn install
RUN yarn build

ENV TINI_VERSION v0.19.0
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini-amd64 /tini
RUN chmod +x /tini

ENTRYPOINT ["/tini", "--"]
CMD ["yarn", "build"]
