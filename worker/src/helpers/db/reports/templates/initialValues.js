module.exports = {
  pending: [],
  dynamic: [],
  connections: {
    active: 0,
    residential: 0,
    commercial: 0,
    newCurrentMonth: 0,
    newLastMonth: 0,
    pending: 0,
    pendingResidential: 0,
    pendingCommercial: 0
  },
  services: {
    active: 0,
    pending: 0,
    residential: 0,
    commercial: 0,
    newCurrentMonth: 0,
    newLastMonth: 0
  },
  churn: {
    awaitingSuspension: {
      total: 0,
      lastMonth: 0,
      currentMonth: 0
    },
    suspended: {
      total: 0,
      lastMonth: 0,
      currentMonth: 0
    },
    awaitingCancelation: {
      total: 0,
      lastMonth: 0,
      currentMonth: 0
    },
    canceled: {
      total: 0,
      lastMonth: 0,
      currentMonth: 0
    }
  }
}
