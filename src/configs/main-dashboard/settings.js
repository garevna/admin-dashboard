export const settings = {
  title: 'Settings',
  refresh: 'settings',
  disabled: 'settings',
  component: 'Settings',
  icon: 'mdi-cog',
  children: [
    {
      title: 'Edit ticket categories',
      route: 'ticket-categories',
      disabled: 'settings',
      icon: 'mdi-ballot-outline'
    },
    {
      title: 'Calendar Settings',
      route: 'schedule-settings',
      disabled: 'settings',
      icon: 'mdi-calendar-edit'
    },
    {
      title: 'Service delivery time',
      route: 'estimated-service-delivery-time-settings',
      disabled: 'settings',
      icon: 'mdi-map-clock'
    },
    {
      title: 'Pending connection status',
      route: 'pending-connection-status-settings',
      disabled: 'settings',
      icon: 'mdi-lan-pending'
    },
    {
      title: 'Available service status updates',
      route: 'available-service-status-updates-settings',
      disabled: 'settings',
      icon: 'mdi-access-point'
    },
    {
      title: 'Building type',
      route: 'building-settings',
      disabled: 'settings',
      icon: 'mdi-greenhouse'
    },
    {
      title: 'Access rights',
      icon: 'mdi-key',
      children: [
        {
          title: 'Admins list',
          route: 'admins-list',
          disabled: 'access',
          icon: 'mdi-table-account'
        },
        {
          title: 'Create new admin',
          route: 'create-admin',
          disabled: 'access',
          icon: 'mdi-account-plus'
        },
        {
          title: 'Available roles',
          route: 'available-roles',
          disabled: 'access',
          icon: 'mdi-account-edit'
        }
      ]
    }
  ]
}
