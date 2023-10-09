export function fromKebab () {
  const string = this.split('-').join(' ')
  return `${string[0].toUpperCase()}${string.slice(1)}`
}
