let search = ''

export const serviceListSearchValueHandler = arg => {
  if (arg === 'GET') return search
  search = arg
}
