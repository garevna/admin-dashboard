const {
  authController,
  cryptoController,
  customersController,
  servicesController,
  ticketsController
  // adminController
} = require('../controllers')

export const routes = {
  admin: {
    init: authController.init,
    auth: authController.auth,
    reset: authController.passwordReset,
    code: authController.sendPasswordResetCode,
    change: authController.changePassword
  },
  // admin: {
  //   credentials: adminController.credentials,
  //   password: adminController.passwordChange,
  //   refresh: adminController.refresh,
  //   get: adminController.get,
  //   put: adminController.update
  // },
  customers: {
    refresh: customersController.getFromRemote,
    list: customersController.getAllCustomers,
    get: customersController.getCustomer,
    post: customersController.createCustomer,
    delete: customersController.deleteCustomer,
    put: customersController.updateCustomer
  },
  crypto: {
    init: cryptoController.init,
    encrypt: cryptoController.encrypt,
    decrypt: cryptoController.decrypt
  },
  services: {
    refresh: servicesController.refresh,
    list: servicesController.list,
    get: servicesController.get,
    post: servicesController.post,
    put: servicesController.put
  },
  tickets: {
    refresh: ticketsController.refresh,
    categories: ticketsController.getCategories,
    list: ticketsController.list,
    get: ticketsController.get,
    post: ticketsController.post,
    put: ticketsController.put
  }
}
