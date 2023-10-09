const currentMonth = new Date().toISOString().slice(0, 7)

module.exports = records => records.filter(record => record.activationDate === currentMonth).length
