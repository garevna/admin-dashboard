export function toKebab () {
  return this.split(' ').join('-').split('')
    .map((char, index) => char.charCodeAt(0) < 91 && char.charCodeAt(0) > 64 ? `${index ? '-' : ''}${char.toLowerCase()}` : char)
    .join('').split('--').join('-')
}
