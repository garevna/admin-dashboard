export const scheduling = {
  request: '',
  resellerId: '',
  customerId: '',
  serviceId: '',
  status: '',
  modified: Date.now(),
  weekNumber: 0,
  weekDetails: {
    start: 0,
    end: 0
  },
  lots: [
    {
      day: 0,
      period: 'AM'
    },
    {
      day: 0,
      period: 'AM'
    }
  ],
  installation: {
    week: 0,
    day: 0,
    period: 'AM'
  }
}
