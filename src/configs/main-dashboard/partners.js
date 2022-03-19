export const partners = {
  title: 'RSP',
  refresh: 'rsp',
  disabled: 'partners',
  icon: 'mdi-account',
  children: [
    {
      title: 'RSP list',
      route: 'rsp-list',
      disabled: 'partners',
      icon: 'mdi-account-multiple',
      access: {
        change: ['Account_manager', 'SuperAdmin'],
        read: ['View_only']
      }
    },
    {
      title: 'Leads requests',
      route: 'leads-request',
      disabled: 'partners',
      icon: 'mdi-account-question',
      access: {
        change: ['Account_manager', 'SuperAdmin'],
        read: ['View_only']
      }
    },
    {
      title: 'Create partner',
      route: 'create-partner',
      disabled: 'partners',
      icon: 'mdi-account-plus',
      access: {
        change: ['Account_manager', 'SuperAdmin'],
        read: ['View_only']
      }
    }
  ]
}
