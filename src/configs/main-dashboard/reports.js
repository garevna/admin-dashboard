export const reports = {
  title: 'Reports',
  refresh: 'buildings',
  disabled: 'reports',
  callbackName: '__refreshReports',
  icon: 'mdi-chart-tree',
  children: [
    {
      title: 'Overview',
      route: 'reports-overview',
      section: 'overview',
      disabled: 'reports',
      icon: 'mdi-chart-bar-stacked'
    },
    {
      title: 'Buildings',
      route: 'reports-buildings',
      section: 'buildings',
      disabled: 'reports',
      icon: 'mdi-chart-bar-stacked'
    },
    {
      title: 'Partners',
      route: 'reports-partners',
      section: 'partners',
      disabled: 'reports',
      icon: 'mdi-chart-bar-stacked'
    }
  ]
}
