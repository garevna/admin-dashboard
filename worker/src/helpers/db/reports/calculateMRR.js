export const calculateMRR = record => {
  const currentMonth = new Date().toISOString().slice(0, 7)

  const { active, pending } = record

  return {
    active: {
      residential: {
        lastMonth: Object.keys(active.residential)
          .filter(key => key < currentMonth)
          .reduce((res, key) => res + active.residential[key], 0),
        currentMonth: Object.keys(active.residential)
          .reduce((res, key) => res + active.residential[key], 0)
      },
      commercial: {
        lastMonth: Object.keys(active.commercial)
          .filter(key => key < currentMonth)
          .reduce((res, key) => res + active.commercial[key], 0),
        currentMonth: Object.keys(active.commercial)
          .reduce((res, key) => res + active.commercial[key], 0)
      }
    },
    pending: {
      residential: Object.keys(pending.residential)
        .reduce((res, key) => res + pending.residential[key], 0),
      commercial: Object.keys(pending.commercial)
        .reduce((res, key) => res + pending.commercial[key], 0)
    }
  }
}
