export const generateDates = minDate => {
  const [currentYear, currentMonth] = [new Date().getFullYear(), new Date().getMonth()]
  const dates = [minDate]
  let year = Number(minDate.slice(0, 4))
  while (year++ < currentYear) {
    let month = 0
    const upper = year === currentYear ? currentMonth : 11
    while (month++ <= upper) {
      dates.unshift(`${year}-${month < 10 ? '0' : ''}${month}`)
    }
  }
  return dates
}
