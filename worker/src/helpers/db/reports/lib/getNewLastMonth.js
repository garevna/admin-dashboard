const date = new Date()
const [year, month] = [date.getFullYear(), date.getMonth()]

const lastMonth = new Date(year, month - 1, 15).toISOString().slice(0, 7)

module.exports = records => records.filter(record => record.activationDate?.slice(0, 7) === lastMonth).length
