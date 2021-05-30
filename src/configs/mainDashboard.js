export const mainDashboard = [
  {
    title: 'RSP',
    icon: 'mdi-account',
    children: [
      {
        title: 'RSP list',
        route: 'rsp-list',
        icon: 'mdi-account-multiple',
        access: {
          change: ['Account_manager', 'SuperAdmin'],
          read: ['View_only']
        }
      },
      {
        title: 'New RSP',
        route: 'leads-request',
        icon: 'mdi-account-plus',
        access: {
          change: ['Account_manager', 'SuperAdmin'],
          read: ['View_only']
        }
      }
    ]
  },
  {
    title: 'Services',
    children: [
      {
        title: 'Service list',
        route: 'services-list',
        icon: 'mdi-ballot-outline',
        access: {
          change: ['Account_manager', 'SuperAdmin'],
          read: ['View_only']
        }
      }
      // {
      //   title: 'Add new service',
      //   route: 'create-new-service',
      //   icon: 'mdi-text-box-plus-outline',
      //   access: {
      //     change: ['Account_manager', 'SuperAdmin'],
      //     read: []
      //   }
      // }
    ]
  },
  {
    title: 'Customers',
    children: [
      {
        title: 'Customers list',
        route: 'customers',
        icon: 'mdi-ballot-outline',
        access: {
          change: ['Account_manager', 'SuperAdmin'],
          read: ['View_only']
        }
      }
      // {
      //   title: 'Customer details',
      //   route: 'customer-detals',
      //   icon: 'mdi-text-box-plus-outline',
      //   access: {
      //     change: ['Account_manager', 'SuperAdmin'],
      //     read: []
      //   }
      // }
    ]
  },
  {
    title: 'Footprint',
    icon: 'mdi-map',
    access: {
      change: ['SuperAdmin', 'Map_editor'],
      read: ['View_only']
    },
    children: [
      {
        title: 'Search address',
        route: 'footprint',
        icon: 'mdi-map-search',
        access: {
          change: ['SuperAdmin', 'Map_editor'],
          read: ['View_only']
        }
      },
      {
        title: 'Edit polygins',
        route: 'polygons',
        icon: 'mdi-map-marker-path',
        access: {
          change: ['Map_editor', 'SuperAdmin'],
          read: ['View_only']
        }
      },
      {
        title: 'Edit building list',
        route: 'buildings',
        icon: 'mdi-home-map-marker',
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
    icon: 'mdi-calendar-month',
    children: [
      {
        title: 'Unattended booking requests',
        route: 'booking',
        icon: 'mdi-table-network',
        access: {
          change: ['Account_manager', 'SuperAdmin'],
          read: ['View_only']
        }
      },
      {
        title: 'Installation Schedule',
        route: 'schedule',
        icon: 'mdi-table-network',
        access: {
          change: ['Account_manager', 'SuperAdmin'],
          read: ['View_only']
        }
      },
      {
        title: 'Calendar Settings',
        icon: 'mdi-calendar-edit',
        access: {
          change: ['Account_manager', 'SuperAdmin'],
          read: ['View_only']
        }
      }
    ]
  },
  {
    title: 'Tickets',
    icon: 'mdi-inbox-multiple',
    children: [
      {
        title: 'Tickets list',
        route: 'tickets',
        icon: 'mdi-ballot-outline',
        access: {
          change: ['Account_manager', 'SuperAdmin'],
          read: ['View_only']
        }
      },
      {
        title: 'Edit categories',
        route: 'ticket-categories',
        icon: 'mdi-ballot-outline',
        access: {
          change: ['Account_manager', 'SuperAdmin'],
          read: ['View_only']
        }
      }
      // {
      //   title: 'Create new ticket',
      //   route: 'ticket-categories',
      //   icon: 'mdi-ballot-outline',
      //   access: {
      //     change: ['Account_manager', 'SuperAdmin'],
      //     read: ['View_only']
      //   }
      // }
    ]
  },
  {
    title: 'Documents',
    component: 'Documents',
    icon: 'mdi-file-document-multiple',
    access: {
      change: ['Account_manager', 'SuperAdmin'],
      read: ['View_only']
    }
  },
  {
    title: 'Settings',
    component: 'Settings',
    icon: 'mdi-cog',
    access: {
      change: ['SuperAdmin'],
      read: ['View_only']
    }
  }
]
