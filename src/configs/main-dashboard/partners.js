export const partners = {
  title: 'RSP',
  refresh: 'rsp',
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
}
