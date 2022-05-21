export const testLastMonth = object => {
  let [year, month] = [new Date().getFullYear(), new Date().getMonth()]
  if (!month) {
    year -= 1
    month = 12
  } else month -= 1
  return Number(object.date.slice(0, 4)) === year && Number(object.date.slice(5, 7)) === month
}
