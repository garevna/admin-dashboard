module.exports = function (record, churn) {
  for (const key of ['awaitingSuspension', 'suspended', 'awaitingCancelation', 'canceled']) {
    for (const propName of ['total', 'lastMonth', 'currentMonth']) record.churn[key][propName] += churn[key][propName]
  }

  return record
}
