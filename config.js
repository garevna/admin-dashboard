const apiHost = (() => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'https://portal.dgtek.net'
    // case 'staging':
    // case 'master':
    // case 'development':
    //   return `https://portal.${process.env.NODE_ENV}.dgtek.net`
    default:
      return 'https://portal.staging.dgtek.net'
  }
})()

const secretHandler = (function () {
  const secret = process.env.VUE_APP_SECRET
  return function () {
    return secret
  }
})()

const apiKeyHandler = (function () {
  const key = process.env.VUE_APP_AUTHORIZATION_KEY
  return function () {
    return key
  }
})()

const geoscapeKeyHandler = (function () {
  const key = process.env.VUE_APP_GEOSCAPE_KEY
  return function () {
    return key
  }
})()

const buildingsHostHandler = (function () {
  const buildingHost = apiHost
  return function () {
    return buildingHost
  }
})()

const hostHandler = (function () {
  // const host = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_HOST_PROD : process.env.VUE_APP_API_HOST_DEV
  // const host = apiHost
  const host = location.origin === 'https://dka.portal.dgtek.net' ? 'https://portal.dgtek.net' : 'https://portal.staging.dgtek.net'
  return function () {
    return host
  }
})()

const partnerCabinetLinkHandler = (function () {
  // const link = process.env.NODE_ENV === 'production' ? 'https://portal.dgtek.net/rsp' : 'http://192.168.0.101:8082/rsp'
  const link = location.origin === 'https://dka.portal.dgtek.net' ? 'https://portal.dgtek.net/rsp' : 'https://portal.staging.dgtek.net/rsp'
  return function () {
    return link
  }
})()

const defaultAdminCredsHandler = (function () {
  const credentials = process.env.VUE_APP_DEFAULT_ADMIN_CREDENTIALS
  return () => credentials
})()

const config = {
  apiSecret: secretHandler,
  apiKey: apiKeyHandler,
  apiHost: hostHandler,
  geoscapeKey: geoscapeKeyHandler,
  buildingsHost: buildingsHostHandler,
  partnerCabinetLink: partnerCabinetLinkHandler,
  defaultAdmin: defaultAdminCredsHandler
}

export {
  config
}

export default {
  install (Vue) {
    Vue.appConfig = config
    Vue.apiSecret = secretHandler
    Vue.apiKey = apiKeyHandler
    Vue.apiHost = hostHandler
    Vue.geoscapeKey = geoscapeKeyHandler
    Vue.buildingsHost = buildingsHostHandler
    Vue.partnerCabinetLink = partnerCabinetLinkHandler

    Vue.defaultAdmin = defaultAdminCredsHandler

    Vue.prototype.$appConfig = config
    Vue.prototype.$apiSecret = secretHandler
    Vue.prototype.$apiKey = apiKeyHandler
    Vue.prototype.$apiHost = hostHandler
    Vue.prototype.$geoscapeKey = geoscapeKeyHandler
    Vue.prototype.$buildingsHost = buildingsHostHandler
    Vue.prototype.$partnerCabinetLink = partnerCabinetLinkHandler

    Vue.prototype.$defaultAdmin = defaultAdminCredsHandler
  }
}
