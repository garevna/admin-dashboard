export const customers = {
  title: 'Customers',
  callbackName: '__refreshCustomersWithPagination',
  refresh: 'customers',
  children: [
    {
      title: 'Customers list',
      route: 'customers',
      icon: 'mdi-ballot-outline',
      access: {
        change: ['Account_manager', 'SuperAdmin'],
        read: ['View_only']
      }
    },
    {
      title: 'Export to Excel',
      route: 'customers-to-excel',
      icon: 'mdi-microsoft-excel',
      access: {
        change: ['Account_manager', 'SuperAdmin'],
        read: ['View_only']
      }
    }
  ]
}
