export function __clone (object) {
  return JSON.parse(JSON.stringify(object))
}
