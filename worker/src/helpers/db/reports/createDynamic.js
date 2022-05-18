export const createDynamic = (dates, sourceData) => dates
  .map(date => sourceData.filter(item => item.date <= date).reduce((sum, item) => sum + (parseFloat(item.subscriptionFee) || 0), 0))
  .map((item, index) => ({ [dates[index]]: Math.round(item * 100) / 100 }))
  .reduce((res, item) => Object.assign(res, item), {})
