export function updatesCallback (event) {
  event.stopPropagation()
  const { status, route, action, ...data } = event.data

  event.stopPropagation()
  const { customers, tickets } = data.result
  if (customers?.length) {
    window[Symbol.for('vue.instance')].$emit('customers-updated-remotelly')
  }
  if (tickets?.length) {
    window[Symbol.for('vue.instance')].$emit('tickets-updated-remotelly')
  }
}
