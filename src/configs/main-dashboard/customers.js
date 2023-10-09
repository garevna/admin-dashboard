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
      icon: 'mdi-table-account'
    },
    {
      title: 'IP list',
      route: 'customers-ip-list',
      disabled: 'customers',
      icon: 'mdi-ip-network'
    },
    {
      title: 'Export to Excel',
      route: 'customers-to-excel',
      disabled: 'customers',
      icon: 'mdi-microsoft-excel'
    },
    {
      title: 'Import',
      disabled: 'customers',
      icon: 'mdi-database-import',
      children: [
        {
          title: 'New customers',
          route: 'import-customers',
          disabled: 'customers',
          icon: 'mdi-database-plus'
        },
        {
          title: 'Updates for existing customers',
          route: 'import-existing-customers',
          disabled: 'customers',
          icon: 'mdi-database-edit'
        }
      ]
    }
    // {
    //   title: 'Import new customers',
    //   route: 'import-customers',
    //   disabled: 'customers',
    //   icon: 'mdi-database-plus'
    // },
    // {
    //   title: 'Import updates for existing customers',
    //   route: 'import-existing-customers',
    //   disabled: 'customers',
    //   icon: 'mdi-database-edit'
    // }
  ]
}
