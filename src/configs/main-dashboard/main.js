export const main = {
  title: 'Dashboard',
  // callbackName: '__refreshCustomersWithPagination',
  // refresh: 'customers',
  children: [
    {
      title: 'Dashboard',
      route: 'main-dash',
      icon: 'mdi-ballot-outline',
      access: {
        change: ['Account_manager', 'SuperAdmin'],
        read: ['View_only']
      }
    }
  ]
}
