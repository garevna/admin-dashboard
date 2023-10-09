let filtered = []

export function filteredHandler (data) {
  if (Array.isArray(data)) filtered = data.sort()
  return filtered
}
