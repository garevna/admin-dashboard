const statuses = [
  {
    title: 'Not Connected',
    pending: true,
    booking: false,
    scheduling: false,
    actions: ['Active']
  },
  {
    title: 'Unable to connect',
    pending: false,
    booking: true,
    scheduling: false,
    actions: ['Awaiting for connection', 'Awaiting for scheduling']
  },
  {
    title: 'Awaiting for connection',
    pending: false,
    booking: true,
    scheduling: false,
    actions: ['Awaiting for scheduling', 'Unable to connect', 'Active']
  },
  {
    title: 'Awaiting for scheduling',
    pending: true,
    booking: true,
    scheduling: false,
    actions: []
  },
  {
    title: 'Awaiting for confirmation',
    pending: false,
    booking: false,
    scheduling: true,
    actions: ['In job queue']
  },
  {
    title: 'In job queue',
    pending: false,
    booking: false,
    scheduling: true,
    actions: ['Active']
  },
  {
    title: 'Active',
    pending: false,
    booking: false,
    scheduling: false,
    actions: []
  },
  {
    title: 'Awaiting for cancelation',
    pending: true,
    booking: true,
    scheduling: false,
    actions: ['In job queue']
  },
  {
    title: 'Awaiting to be suspended',
    pending: true,
    booking: true,
    scheduling: false,
    actions: ['In job queue']
  },
  {
    title: 'Awaiting to be resumed',
    pending: true,
    booking: true,
    scheduling: false,
    actions: ['In job queue']
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
  test: (value, type) => statuses[type] ? statuses[type]().includes(value) : false,
  getAvailableStatusValues: (value) => statuses[value].actions
}
