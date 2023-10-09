export const getSelectedFields = (record, fields) => {
  const result = {}
  for (const field of fields) {
    const parts = field.split('.')
    if (parts.length === 2) result[parts[1]] = record[parts[0]][parts[1]]
    else result[field] = record[field]
  }
  return result
}
