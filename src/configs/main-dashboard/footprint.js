export const footprint = {
  title: 'Footprint',
  callback: '__refreshCustomersWithPagination',
  refresh: 'footprint',
  icon: 'mdi-map',
  access: {
    change: ['SuperAdmin', 'Map_editor'],
    read: ['View_only']
  },
  children: [
    {
      title: 'Search address',
      route: 'footprint',
      icon: 'mdi-map-search',
      access: {
        change: ['SuperAdmin', 'Map_editor'],
        read: ['View_only']
      }
    },
    {
      title: 'Edit polygins',
      route: 'polygons',
      icon: 'mdi-map-marker-path',
      access: {
        change: ['Map_editor', 'SuperAdmin'],
        read: ['View_only']
      }
    },
    {
      title: 'Edit building list',
      route: 'buildings',
      icon: 'mdi-home-map-marker',
      access: {
        change: ['Map_editor', 'SuperAdmin'],
        read: ['View_only']
      }
    },
    {
      title: 'Create Excel file',
      route: 'excel',
      icon: 'mdi-microsoft-excel',
      access: {
        change: ['Map_editor', 'SuperAdmin'],
        read: ['View_only']
      }
    }
  ]
}
