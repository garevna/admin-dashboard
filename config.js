const apiHost = location.hostname === 'dka.portal.dgtek.net' ? 'https://portal.dgtek.net' : 'https://portal.staging.dgtek.net'

// const apiHost = 'https://portal.dgtek.net'

const secretHandler = (function () {
  const secret = process.env.VUE_APP_SECRET
  return function () {
    return secret
  }
})()

const apiKeyHandler = (function () {
  const key = process.env.VUE_APP_AUTHORIZATION_KEY
  return () => key
})()

const geoscapeKeyHandler = (function () {
  const key = process.env.VUE_APP_GEOSCAPE_KEY
  return () => key
})()

const buildingsHostHandler = () => apiHost

const hostHandler = () => apiHost

const partnerCabinetLinkHandler = () => `${apiHost}/rsp`

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
