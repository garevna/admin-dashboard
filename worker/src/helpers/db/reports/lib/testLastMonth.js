const date = new Date()
const [year, month] = [date.getFullYear(), date.getMonth()]

const lastMonth = new Date(year, month - 1, 15).toISOString().slice(0, 7)

module.exports = object => object.date.slice(0, 7) === lastMonth
