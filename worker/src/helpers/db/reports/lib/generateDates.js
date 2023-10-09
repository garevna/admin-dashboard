const getDateString = date => date.toISOString().slice(0, 7)

module.exports = function (startDate = '2017-01') {
  const date = new Date(startDate)

  let [month, year] = [date.getMonth(), date.getFullYear()]

  const currentDate = getDateString(new Date())

  const result = []

  while (getDateString(new Date(year, month)) <= currentDate) {
    result.push(getDateString(new Date(year, month++)))
  }

  return result
}
