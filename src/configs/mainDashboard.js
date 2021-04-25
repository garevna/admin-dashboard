export const mainDashboard = [
  {
    title: 'RSP list',
    component: 'RspList',
    route: 'rsp-list',
    access: {
      change: ['Account_manager', 'SuperAdmin'],
      read: ['View_only']
    }
  },
  {
    title: 'RSP details',
    component: 'RspDetails',
    route: 'rsp-details',
    access: {
      change: ['Account_manager', 'SuperAdmin'],
      read: ['View_only']
    }
  },
  {
    title: 'Services list',
    component: 'servicesList',
    route: 'services-list',
    access: {
      change: ['Account_manager', 'SuperAdmin'],
      read: ['View_only']
    }
  },
  {
    title: 'Service details',
    component: 'serviceDetails',
    route: 'service-details',
    access: {
      change: ['Account_manager', 'SuperAdmin'],
      read: ['View_only']
    }
  },
  {
    title: 'Add service',
    component: 'AddService',
    route: 'new-service',
    access: {
      change: ['Account_manager', 'SuperAdmin'],
      read: []
    }
  },
  // {
  //   title: 'Services',
  //   component: 'Services',
  //   route: 'services',
  //   access: {
  //     change: ['Account_manager', 'SuperAdmin'],
  //     read: ['View_only']
  //   },
  //   children: [
  //     {
  //       title: 'Service list',
  //       component: 'servicesList',
  //       route: 'services-list',
  //       access: {
  //         change: ['Account_manager', 'SuperAdmin'],
  //         read: ['View_only']
  //       }
  //     },
  //     {
  //       title: 'Add service',
  //       component: 'AddService',
  //       route: 'new-service',
  //       access: {
  //         change: ['Account_manager', 'SuperAdmin'],
  //         read: []
  //       }
  //     }
  //   ]
  // },
  {
    title: 'Customers',
    component: 'Customers',
    access: {
      change: ['Account_manager', 'SuperAdmin'],
      read: ['View_only']
    }
  },
  {
    title: 'Footprint',
    component: 'Footprint',
    access: {
      change: ['SuperAdmin', 'Map_editor'],
      read: ['View_only']
    },
    children: [
      {
        title: 'Edit polygins',
        component: 'EditPolygons',
        access: {
          change: ['Map_editor', 'SuperAdmin'],
          read: ['View_only']
        }
      },
      {
        title: 'Edit building list',
        component: 'Buildings',
        access: {
          change: ['Map_editor', 'SuperAdmin'],
          read: ['View_only']
        }
      }
    ]
  },
  {
    title: 'Scheduling',
    component: 'Scheduling',
    access: {
      change: ['Account_manager', 'SuperAdmin'],
      read: ['View_only']
    }
  },
  {
    title: 'Tickets',
    component: 'Tickets',
    access: {
      change: ['Account_manager', 'SuperAdmin'],
      read: ['View_only']
    }
  },
  {
    title: 'Documents',
    component: 'Documents',
    access: {
      change: ['Account_manager', 'SuperAdmin'],
      read: ['View_only']
    }
  },
  {
    title: 'Settings',
    component: 'Settings',
    access: {
      change: ['SuperAdmin'],
      read: ['View_only']
    }
  }
]
