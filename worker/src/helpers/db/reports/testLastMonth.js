export const testLastMonth = service => {
  let [year, month] = [new Date().getFullYear(), new Date().getMonth()]
  if (!month) {
    year -= 1
    month = 12
  } else month -= 1
  return Number(service.date.slice(0, 4)) === year && Number(service.date.slice(5, 7)) === month
}
