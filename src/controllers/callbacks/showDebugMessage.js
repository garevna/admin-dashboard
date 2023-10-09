export function showDebugMessage (data) {
  // const { status, ...content } = data
  console.group('WORKER DEBUG MESSAGE')
  console.log(data)
  // Object.keys(content).forEach(key => console.log(key, content[key]))
  console.groupEnd('WORKER DEBUG MESSAGE')
}
