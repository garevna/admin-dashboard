// import {
//   getWeekNumber,
//   getWeekStartDate,
//   getWeekEndDate
// } from 'garevna-date-functions'

export const scheduling = {
  request: '',
  resellerId: '',
  customerId: '',
  serviceId: '',
  status: '',
  modified: Date.now(),
  weekNumber: this.getWeekNumber(Date.now()),
  weekDetails: {
    start: this.getWeekStartDate(Date.now()),
    end: this.getWeekEndDate(Date.now())
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
