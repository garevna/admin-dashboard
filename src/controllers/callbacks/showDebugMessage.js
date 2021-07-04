export function showDebugMessage (data) {
  event.stopImmediatePropagation()
  const { status, ...content } = data
  console.group('WORKER DEBUG MESSAGE')
  Object.keys(content).forEach(key => console.log(key, content[key]))
  console.groupEnd('WORKER DEBUG MESSAGE')
}
