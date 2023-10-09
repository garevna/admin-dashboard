export const customerSchema = {
  commercial: {
    companyName: {
      title: 'Company name',
      type: 'simple-text',
      selected: false,
      value: ''
    },
    companyAbn: {
      title: 'Company ABN',
      type: 'abn',
      selected: false,
      value: ''
    }
  },
  customerAddress: {
    apartmentNumber: {
      title: 'Apt number',
      type: 'simple-text',
      selected: false,
      value: ''
    },
    address: {
      title: 'Address',
      type: 'address',
      selected: false,
      value: ''
    }
  },
  customerDetails: {
    firstName: {
      title: 'First name',
      type: 'simple-text',
      selected: false,
      value: ''
    },
    lastName: {
      title: 'Last Name',
      type: 'simple-text',
      selected: false,
      value: ''
    },
    uniqueCode: {
      title: 'Unique code',
      type: 'simple-text',
      selected: false,
      value: ''
    },
    phoneWork: {
      title: 'Phone (work)',
      type: 'phone',
      selected: false,
      value: ''
    },
    phoneMobile: {
      title: 'Phone (mobile)',
      type: 'mobile',
      selected: false,
      value: ''
    },
    primaryEmail: {
      title: 'Email (primary)',
      type: 'email',
      selected: false,
      value: ''
    },
    alternativeEmail: {
      title: 'Email (alternative)',
      type: 'email',
      selected: false,
      value: ''
    }
  }
}
