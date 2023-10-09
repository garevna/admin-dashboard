let pageNumber = 1

export function buildingsListPageNumberHandler (value) {
  if (!value || typeof value !== 'number') return pageNumber
  pageNumber = value
}
