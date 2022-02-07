export const services = {
  title: 'Services',
  refresh: 'services',
  icon: 'mdi-ballot-outline',
  children: [
    {
      title: 'Service list',
      route: 'services-list',
      icon: 'mdi-format-list-bulleted-square',
      access: {
        change: ['Account_manager', 'SuperAdmin'],
        read: ['View_only']
      }
    },
    {
      title: 'SLA',
      route: 'sla',
      icon: 'mdi-file-cog-outline',
      access: {
        change: ['Account_manager', 'SuperAdmin'],
        read: ['View_only']
      }
    }
  ]
}
