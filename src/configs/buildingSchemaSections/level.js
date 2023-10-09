export const levelSchema = {
  name: '',
  ownerOfExistingCAC: '',
  planned: {
    router: false,
    splicingBox: false,
    splitter: false,
    oftu: false,
    rack: false,
    gPOinRisers: false,
    customerAccessCabling: false
  },
  installed: {
    router: false,
    splicingBox: false,
    splitter: false,
    oftu: false,
    rack: false,
    gPOinRisers: false,
    customerAccessCabling: false
  },
  details: {
    router: '',
    splicingBox: '',
    splitter: '',
    oftu: '',
    rack: '',
    gPOinRisers: '',
    customerAccessCabling: ''
  },
  exist: {
    gPOinRisers: false,
    customerAccessCabling: false
  }
}

export const equipmentNames = ['router', 'splicingBox', 'splitter', 'oftu', 'gPOinRisers', 'uPSinRisers', 'customerAccessCabling', 'rack']
