export const serviceSchema = {
  legacy: {
    title: 'Legacy',
    type: 'checkbox',
    value: false
  },
  serviceName: {
    title: 'Service name',
    type: 'simple-text',
    value: ''
  },
  serviceCode: {
    title: 'Service code',
    type: 'simple-text',
    value: ''
  },
  contractTerm: {
    title: 'Term (months)',
    type: 'number',
    value: 0
  },
  connectionFee: {
    title: 'Connection fee $NRC',
    type: 'money',
    value: 0
  },
  subscriptionFee: {
    title: 'Monthly fee $MRC',
    type: 'money',
    value: 0
  },
  discountValue: {
    title: 'Discount',
    type: 'discount',
    value: 0
  },
  discountUnits: {
    title: 'Units',
    type: 'ignored',
    available: ['%', '$'],
    value: '%'
  },
  serviceType: {
    title: 'Type (residential/commercial)',
    type: 'switcher',
    available: ['residential', 'commercial'],
    value: 'residential'
  },
  productType: {
    title: 'Product type',
    type: 'simple-text',
    value: ''
  },
  freeTrial: {
    title: 'Trial period',
    type: 'simple-text',
    value: ''
  },
  equipmentCost: {
    title: 'Equipment cost',
    type: 'money',
    value: 0
  },
  equipmentType: {
    title: 'Equipment type',
    type: 'simple-text',
    value: ''
  },
  equipmentRequired: {
    title: 'Equipment required',
    type: 'checkbox',
    value: false
  },
  dataLimit: {
    title: 'Data',
    type: 'simple-text',
    value: ''
  },
  serviceDescription: {
    title: 'Service description',
    type: 'simple-text',
    value: ''
  },
  downstreamSpeed: {
    title: 'Downstream speed',
    type: 'number',
    value: 50
  },
  upstreamSpeed: {
    title: 'Upstream speed (Mbps)',
    type: 'number',
    value: 50
  },
  earlyTerminatioFee: {
    title: 'Early termination fee ($)',
    type: 'number',
    value: 0
  },
  gstIncEx: {
    title: 'gstIncEx',
    type: 'checkbox',
    value: false
  },
  // serviceSLA: {
  //   title: 'Service SLA',
  //   type: 'sla',
  //   value: ''
  // },
  promo: {
    title: 'Promo',
    type: 'simple-text',
    value: ''
  }
  // partners: {
  //   title: 'Partners',
  //   type: 'array',
  //   value: []
  // }
}
