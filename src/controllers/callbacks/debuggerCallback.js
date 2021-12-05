export function debuggerCallback (event) {
  event.stopImmediatePropagation()
  console.group('WORKER DEBUG MESSAGE')
  const data = event.data.result?.data || event.data.response || event.data
  console.log(data)
  console.groupEnd('WORKER DEBUG MESSAGE')
}
