export const schedule = {
  refresh: 'schedule-refreshed',
  get: 'schedule-week-data-received',
  put: 'schedule-week-data-updated',
  settings: 'schedule-settings-received',
  config: 'schedule-settings-updated',
  job: 'moved-to-job-queue',
  activate: 'service-activated',
  pending: 'pending-requests-received'
}

export const booking = {
  get: 'booking-requests-received',
  update: 'service-delivery-status-updated'
}

export const lots = {
  get: 'schedule-lots-received'
}
