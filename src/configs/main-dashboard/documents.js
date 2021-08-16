export const documents = {
  title: 'Documents',
  refresh: 'documents',
  icon: 'mdi-file-document-multiple',
  children: [
    {
      title: 'Document list',
      route: 'documents',
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
