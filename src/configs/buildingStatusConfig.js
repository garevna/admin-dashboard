export const buildingStatusConfig = {
  'on-net': {
    title: 'on-net',
    terms: '1-3 days',
    buildingStatus: 'LIT',
    storeName: 'lit',
    newCustomerDisabled: false
  },
  footprint: {
    title: 'footprint',
    terms: '1-2 weeks',
    buildingStatus: 'Footprint',
    polygonType: 'ServiceAvailable',
    storeName: 'footprint',
    newCustomerDisabled: false
  },
  'construction-commenced': {
    title: 'Construction commenced',
    terms: '2-6 weeks',
    buildingStatus: 'BuildCommenced',
    polygonType: 'UnderConstruction',
    storeName: 'build',
    newCustomerDisabled: false
  },
  'coming-soon': {
    title: 'Coming soon',
    terms: '4-8 weeks',
    buildingStatus: 'ComingSoon',
    polygonType: 'ComingSoon',
    storeName: 'soon',
    newCustomerDisabled: false
  },
  'not-available': {
    title: 'Not available',
    terms: 'N/A',
    buildingStatus: 'Other',
    polygonType: null,
    storeName: 'other',
    newCustomerDisabled: true
  }
}
