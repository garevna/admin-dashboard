const statuses = [
  {
    title: 'Not Connected',
    pending: true,
    booking: false,
    scheduling: false
  },
  {
    title: 'Unable to connect',
    pending: false,
    booking: true,
    scheduling: false
  },
  {
    title: 'Awaiting for connection',
    pending: false,
    booking: true,
    scheduling: false
  },
  {
    title: 'Awaiting for scheduling',
    pending: true,
    booking: true,
    scheduling: false
  },
  {
    title: 'Awaiting for confirmation',
    pending: false,
    booking: false,
    scheduling: true
  },
  {
    title: 'In job queue',
    pending: false,
    booking: false,
    scheduling: true
  },
  {
    title: 'Active',
    pending: false,
    booking: false,
    scheduling: false
  }
]

statuses.booking = () => statuses.filter(item => item.booking).map(item => item.title)
statuses.scheduling = () => statuses.filter(item => item.scheduling).map(item => item.title)
statuses.pending = () => statuses.filter(item => item.pending).map(item => item.title)

export const serviceStatus = {
  all: statuses.map(item => item.title),
  booking: statuses.booking(),
  scheduling: statuses.scheduling(),
  pending: statuses.pending(),
  test: (value, type) => statuses[type] ? statuses[type]().includes(value) : false
}
