export const services = {
  title: 'Services',
  refresh: 'services',
  disabled: 'services',
  icon: 'mdi-ballot-outline',
  children: [
    {
      title: 'Service list',
      route: 'services-list',
      disabled: 'services',
      icon: 'mdi-format-list-bulleted-square',
      access: {
        change: ['Account_manager', 'SuperAdmin'],
        read: ['View_only']
      }
    },
    {
      title: 'SLA',
      route: 'sla',
      disabled: 'services',
      icon: 'mdi-file-cog-outline',
      access: {
        change: ['Account_manager', 'SuperAdmin'],
        read: ['View_only']
      }
    }
  ]
}
