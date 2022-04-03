export const lastMonthYear = dateISO => {
  const year = new Date().getFullYear() - (new Date().getMonth() ? 0 : 1)
  return year === dateISO.slice(0, 4) - 0
}
