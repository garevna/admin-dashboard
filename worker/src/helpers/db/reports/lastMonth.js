import { getDate, lastMonthYear } from './'

export const lastMonth = service => {
  const activationDate = getDate(service)

  return lastMonthYear(activationDate) && new Date().getMonth() === activationDate.slice(5, 7) - 2
}
