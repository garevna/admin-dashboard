export const services = {
  title: 'Services',
  refresh: 'services',
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
  ]
}
