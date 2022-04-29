let filter = ''

export const filterHandler = arg => {
  if (arg) filter = arg
  else return filter
}
