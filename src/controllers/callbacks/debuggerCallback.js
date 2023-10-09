export function debuggerCallback (event) {
  event.stopImmediatePropagation()
  // window[Symbol.for('vue.instance')].$emit('open-debugger-console', event.data)
  window[Symbol.for('vue.instance')].$emit('update-debugger-console-data', event.data)
}
