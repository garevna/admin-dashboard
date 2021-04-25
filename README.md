# dgtek-admin-dasg

[**demo**](https://vue-command.github.io/dgtek-admin-dash/)

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Web-WORKER

#### Requests to the worker:

##### routes and actions:

| route | action | comment |
|-|-|-|
| customers |  |  |
|  | refresh | get from remote server to local DB |
|  | list | get all customers from local DB |
|  | get | get customer from local DB by id |
|  | add | add new customer |
|  | remove | delete customer by id |
|  | update | update customer data |
| rsp |  |  |
|  | init | set host, app key and secret from .env |
|  | auth | send request to remote server for credentials |
|  | get | get RSP data |
|  | update | update RSP data |
| tickets |  |  |
|  | get | get all tickets |
|  | post | post new ticket |
| services |  |  |
|  | get | get all services |
