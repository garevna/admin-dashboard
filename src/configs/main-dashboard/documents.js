export const documents = {
  title: 'Documents',
  refresh: 'documents',
  disabled: 'documents',
  icon: 'mdi-file-document-multiple',
  children: [
    {
      title: 'Document list',
      route: 'documents',
      disabled: 'documents',
      icon: 'mdi-file-document-multiple',
      access: {
        change: ['Account_manager', 'SuperAdmin'],
        read: ['View_only']
      }
    }
  ]
  // component: 'Documents',
  // icon: 'mdi-file-document-multiple',
  // access: {
  //   change: ['Account_manager', 'SuperAdmin'],
  //   read: ['View_only']
  // }
}
