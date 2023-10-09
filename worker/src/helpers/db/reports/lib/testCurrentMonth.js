const currentMonth = new Date().toISOString().slice(0, 7)

module.exports = object => object.date.slice(0, 7) === currentMonth
