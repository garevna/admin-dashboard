export const newBuilding = {
  address: '',
  addressComponents: {
    city: '',
    postCode: '',
    state: '',
    street: '',
    streetType: '',
    number: '',
    buildingClass: '',
    buildingType: '',
    buildingCategory: '',
    isMaster: false,
    isSlave: false,
    masterBuildingId: '',
    slaves: []
  },
  buildingUniqueCode: '',
  buildingName: '',
  coordinates: [0, 0],
  status: 'Other',
  type: '',
  footprint: true,
  distanceFromFootprint: 0,
  avgFloorHeight: 0,
  customerInstallApprovalRequired: false,
  inductionRequired: true,
  infrastructure: {
    type: '',
    backbone: {
      installed: false,
      planned: false
    },
    customerAccessCabling: {
      installed: false,
      planned: false
    },
    gPOinMDF: {
      exist: false,
      installed: false,
      planned: false
    },
    gPOinRisers: {
      exist: false,
      installed: false,
      planned: false
    },
    leadIn: {
      installed: false,
      planned: false
    },
    uPSinMDF: {
      installed: false,
      planned: false
    },
    uPSinRisers: {
      installed: false,
      planned: false
    }
  },
  levels: [
    {
      name: '',
      planned: {
        oftu: '',
        router: '',
        splicingBox: false,
        splitter: false
      },
      installed: {
        oftu: '',
        router: '',
        splicingBox: false,
        splitter: false
      }
    }
  ],
  difficultyLevel: {
    backboneInstallation: 0,
    customerInstallation: 0,
    leadInInstallation: 0
  },
  estimatedServiceDeliveryTime: '1-3 days',
  files: {
    approoval: '',
    design: '',
    laanInspect: '',
    laanInstall: '',
    scope: '',
    photos: []
  },
  management: {
    managerName: '',
    managerPhoneWork: '',
    phoneWork: '',
    phoneMobile: '',
    emailPrimary: '',
    emailAlternative: ''
  },
  owner: {
    corporationName: '',
    contactPerson: '',
    corporationPhoneWork: '',
    corporationPhoneMobile: '',
    corporationEmailPrimary: '',
    corporationEmailAlternative: ''
  }
}
