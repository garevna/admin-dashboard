export const testCurrentMonth = object => {
  const [year, month] = [new Date().getFullYear(), new Date().getMonth()]
  return Number(object.date.slice(0, 4)) === year && Number(object.date.slice(5, 7)) === month + 1
}
