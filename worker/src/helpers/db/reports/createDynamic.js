export const createDynamic = (dates, sourceData) => dates
  .map(date => sourceData.filter(item => item.date <= date).reduce((sum, item) => sum + item.subscriptionFee, 0))
  .map((item, index) => ({ [dates[index]]: item }))
  .reduce((res, item) => Object.assign(res, item), {})
