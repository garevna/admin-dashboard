const date = new Date()
const [year, month] = [date.getFullYear(), date.getMonth()]

const currentMonth = new Date().toISOString().slice(0, 7)
const lastMonth = new Date(year, month - 1, 15).toISOString().slice(0, 7)
const prevMonth = new Date(year, month - 2, 15).toISOString().slice(0, 7)

module.exports = () => ([currentMonth, lastMonth, prevMonth])
