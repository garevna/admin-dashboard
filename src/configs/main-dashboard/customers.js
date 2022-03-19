export const customers = {
  title: 'Customers',
  icon: 'mdi-account-multiple',
  callbackName: '__refreshCustomersWithPagination',
  refresh: 'customers',
  disabled: 'customers',
  children: [
    {
      title: 'Customer list',
      route: 'customers',
      disabled: 'customers',
      icon: 'mdi-table-account',
      access: {
        change: ['Account_manager', 'SuperAdmin', 'supervisor', 'admin'],
        read: ['View_only']
      }
    },
    {
      title: 'Export to Excel',
      route: 'customers-to-excel',
      disabled: 'customers',
      icon: 'mdi-microsoft-excel',
      access: {
        change: ['Account_manager', 'SuperAdmin', 'supervisor', 'admin']
      }
    },
    {
      title: 'Import from text file',
      route: 'import-customers',
      disabled: 'customers',
      icon: 'mdi-database-import',
      access: {
        change: ['Account_manager', 'SuperAdmin', 'supervisor', 'admin'],
        read: ['View_only']
      }
    }
  ]
}
