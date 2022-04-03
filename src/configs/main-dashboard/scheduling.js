export const scheduling = {
  title: 'Scheduling',
  component: 'Scheduling',
  disabled: 'schedule',
  callbackName: '__refreshSchedule',
  refresh: 'schedule',
  icon: 'mdi-calendar-month',
  children: [
    {
      title: 'Unattended booking requests',
      route: 'booking',
      disabled: 'schedule',
      icon: 'mdi-table-network'
    },
    {
      title: 'Installation Schedule',
      route: 'schedule',
      disabled: 'schedule',
      icon: 'mdi-table-network'
    }
  ]
}
