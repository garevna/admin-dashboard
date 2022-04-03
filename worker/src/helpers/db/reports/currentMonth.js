import { getDate, currentMonthYear } from './'

export const currentMonth = service => {
  const activationDate = getDate(service)

  return currentMonthYear(activationDate) && new Date().getMonth() === activationDate.slice(5, 7) - 1
}
