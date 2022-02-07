export const customers = {
  title: 'Customers',
  icon: 'mdi-account-multiple',
  callbackName: '__refreshCustomersWithPagination',
  refresh: 'customers',
  children: [
    {
      title: 'Customers list',
      route: 'customers',
      icon: 'mdi-table-account',
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
