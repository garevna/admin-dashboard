export const currentMonth = service => {
  const [year, month] = [new Date().getFullYear(), new Date().getMonth()]
  return Number(service.date.slice(0, 4)) === year && Number(service.date.slice(5, 7)) === month + 1
}
