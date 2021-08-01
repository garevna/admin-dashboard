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
      title: 'Config schedule',
      route: 'schedule-settings',
      icon: 'mdi-ballot-outline',
      access: {
        change: ['Account_manager', 'SuperAdmin'],
        read: ['View_only']
      }
    }
  ]
}
