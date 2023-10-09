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
      icon: 'mdi-format-list-bulleted-square'
    },
    {
      title: 'SLA',
      route: 'sla',
      disabled: 'services',
      icon: 'mdi-file-cog-outline'
    }
  ]
}
