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
      title: 'Leads requests',
      route: 'leads-request',
      icon: 'mdi-account-question',
      access: {
        change: ['Account_manager', 'SuperAdmin'],
        read: ['View_only']
      }
    },
    {
      title: 'Create partner',
      route: 'create-partner',
      icon: 'mdi-account-plus',
      access: {
        change: ['Account_manager', 'SuperAdmin'],
        read: ['View_only']
      }
    }
  ]
}
