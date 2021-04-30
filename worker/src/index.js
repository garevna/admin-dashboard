import { routes } from './configs'

self.initialized = false

self.onmessage = (event) => {
  const { route, action, ...data } = event.data

  // event.target.postMessage({ status: 300, route, action, result: data })

  if (!routes[route][action] || typeof routes[route][action] !== 'function') {
    return event.target.postMessage({ status: 422, route, action, result: `${route}/${action} Invalid request for ${route}` })
  }
  routes[route][action](data)
}
