let page = 1

export const serviceListPageNumberHandler = arg => {
  if (arg) page = arg
  else return page
}
