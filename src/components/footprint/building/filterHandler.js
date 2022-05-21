let search = ''

export const filterHandler = arg => {
  if (arg === 'GET') return search
  search = arg
}
