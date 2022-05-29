const getDate = (year, month) => `${year}-${month < 10 ? '0' : ''}${month}`

export const generateDates = minDate => {
  const [currentYear, currentMonth, minYear, minMonth] = [
    new Date().getFullYear(),
    new Date().getMonth(),
    Number(minDate.slice(0, 4)),
    Number(minDate.slice(5, 7))
  ]

  let [year, month] = [minYear, minMonth]

  if (!year || !month || year > currentYear || (year === currentYear && month > currentMonth)) return []

  const dates = []

  if (year < currentYear) {
    while (month <= 12) {
      dates.unshift(getDate(year, month++))
    }
    year++
  }

  while (year <= currentYear) {
    let month = minYear === currentYear ? minMonth : 1
    const upper = year === currentYear ? currentMonth + 1 : 12
    while (month <= upper) {
      dates.unshift(getDate(year, month++))
    }
    year++
  }
  return dates
}
