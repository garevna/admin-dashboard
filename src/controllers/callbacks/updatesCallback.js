export function updatesCallback (event) {
  event.stopPropagation()
  const { status, route, action, ...data } = event.data
  if (data.result) window[Symbol.for('vue.instance')].$emit('customers-updated-remotelly')
}
