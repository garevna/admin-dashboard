export function debuggerCallback (event) {
  event.stopImmediatePropagation()
  console.group('WORKER DEBUG MESSAGE')
  const data = event.data.result?.data || event.data.response || event.data
  const { status, ...rest } = data
  for (const key in rest) {
    console.log(key, rest[key])
  }
  console.groupEnd('WORKER DEBUG MESSAGE')
}
