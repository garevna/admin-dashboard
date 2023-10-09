export const schemaRSP = {
  company: {
    name: {
      title: 'Company name',
      type: 'simple-text',
      value: ''
    },
    abn: {
      title: 'ABN',
      type: 'abn',
      value: ''
    },
    address: {
      title: 'Address',
      type: 'address',
      value: ''
    },
    website: {
      title: 'Website',
      type: 'url',
      value: ''
    },
    primaryContact: {
      title: 'Primary contact',
      type: 'simple-text',
      value: ''
    },
    phoneWork: {
      title: 'Phone (work)',
      type: 'phone',
      value: ''
    },
    phoneMobile: {
      title: 'Phone (mobile)',
      type: 'phone',
      value: ''
    },
    emailPrimary: {
      title: 'Email (primary)',
      type: 'email',
      value: ''
    },
    emailAlternative: {
      title: 'Email (alternative)',
      type: 'email',
      value: ''
    }
  },
  general: {
    aboutBusiness: {
      title: 'Information about the business',
      type: 'textarea',
      value: ''
    },
    annualRevenue: {
      title: 'Annual revenue',
      type: 'number',
      value: 10
    },
    numberOfCustomers: {
      title: 'Number of customers',
      type: 'number',
      value: 1000
    },
    customerAreas: {
      title: 'Areas where the most of customers are located',
      type: 'textarea',
      value: []
    },
    other: {
      title: 'Other relevant information',
      type: 'textarea',
      value: '...'
    }
  },
  technic: {
    info: {
      title: 'Technical information',
      type: 'textarea',
      value: '...'
    },
    contact: {
      title: 'Technical contact',
      type: 'simple-text',
      value: ''
    },
    phoneWork: {
      title: 'Phone (work)',
      type: 'phone',
      value: ''
    },
    phoneMobile: {
      title: 'Phone (mobile)',
      type: 'phone',
      value: ''
    },
    emailPrimary: {
      title: 'Email (primary)',
      type: 'email',
      value: ''
    },
    emailAlternative: {
      title: 'Email (alternative)',
      type: 'email',
      value: ''
    }
  },
  userInfo: {
    login: {
      title: 'login',
      type: 'simple-text',
      value: ''
    },
    userName: {
      title: 'User name',
      type: 'simple-text',
      value: ''
    },
    phoneNumber: {
      title: 'Password reset phone number',
      type: 'phone',
      value: ''
    },
    password: {
      title: 'Password',
      type: 'password',
      value: ''
    }
  }
}
