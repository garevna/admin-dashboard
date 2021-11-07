export const mapWorkerEvents = {
  init: 'map-worker-is-ready',
  refresh: 'buildings-refreshed',
  address: 'building-details-received',
  details: 'building-details-received',
  getById: 'building-details-received', /* for old ver */
  list: 'buildings-address-list-received',
  table: 'buildings-table-data-received',
  post: 'new-building-created',
  put: 'building-details-updated',
  patch: 'building-details-updated',
  remove: 'building-deleted'
}
