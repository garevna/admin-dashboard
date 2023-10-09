let filters = {}

export function filtersChanged (data) {
  if (!data) {
    filters = {}
    return true
  }
  const notEqual = Object.keys(filters).toString() !== Object.keys(data).toString() ||
    Object.values(filters).toString() !== Object.values(data).toString()
  if (notEqual) filters = data
  return notEqual
}
