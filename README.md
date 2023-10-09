# dgtek-admin-dash

### [Controller Description](https://github.com/garevna/dgtek-admin-dash/wiki/Controller-common-description)

#### Project setup

```
yarn install
```

But you need to install the package **dgtek-map** manually:

```
yarn add dgtek-map && mv node_modules/dgtek-map/dist/map.worker.js public
```

#### .env

Application needs the following environment variables to be set
```
VUE_APP_AUTHORIZATION_KEY=...

VUE_APP_BUILDINGS_API_HOST=...
VUE_APP_API_HOST=...

VUE_APP_GEOSCAPE_KEY=...

VUE_APP_SECRET=...

VUE_APP_PUBLIC_PATH_PRODUCTION=...
```

#### web-worker

To build the web-worker you should move to **worker** folder
```
cd worker
```
and run the command:
```
cd worker
yarn add crypto-js && webpack --config ./worker/webpack.config.worker.js --mode production && yarn remove crypto-js
```

#### Compiles and hot-reloads for development

```
yarn serve
```

#### Compiles and minifies for production

```
yarn build
```

#### Lints and fixes files

```
yarn lint
```

#### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
