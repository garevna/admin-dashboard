export const settings = {
  title: 'Settings',
  refresh: 'settings',
  component: 'Settings',
  icon: 'mdi-cog',
  access: {
    change: ['SuperAdmin'],
    read: ['View_only']
  },
  children: [
    {
      title: 'Edit ticket categories',
      route: 'ticket-categories',
      icon: 'mdi-ballot-outline',
      access: {
        change: ['Account_manager', 'SuperAdmin'],
        read: ['View_only']
      }
    },
    {
      title: 'Calendar Settings',
      route: 'schedule-settings',
      icon: 'mdi-calendar-edit',
      access: {
        change: ['SuperAdmin'],
        read: ['View_only']
      }
    },
    {
      title: 'Service delivery time',
      route: 'estimated-service-delivery-time-settings',
      icon: 'mdi-map-clock',
      access: {
        change: ['SuperAdmin'],
        read: ['View_only']
      }
    },
    {
      title: 'Pending connection status',
      route: 'pending-connection-status-settings',
      icon: 'mdi-lan-pending',
      access: {
        change: ['SuperAdmin'],
        read: ['View_only']
      }
    },
    {
      title: 'Available service status updates',
      route: 'available-service-status-updates-settings',
      icon: 'mdi-access-point',
      access: {
        change: ['SuperAdmin'],
        read: ['View_only']
      }
    }
    // {
    //   title: 'Available service status list',
    //   route: 'available-service-status-settings',
    //   icon: 'mdi-access-point',
    //   access: {
    //     change: ['SuperAdmin'],
    //     read: ['View_only']
    //   }
    // }
  ]
}
