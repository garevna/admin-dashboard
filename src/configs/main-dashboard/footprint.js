export const footprint = {
  title: 'Footprint',
  refresh: 'footprint',
  disabled: 'footprint',
  icon: 'mdi-map',
  access: {
    change: ['SuperAdmin', 'Map_editor'],
    read: ['View_only']
  },
  children: [
    {
      title: 'Search address',
      route: 'footprint',
      disabled: 'buildings',
      icon: 'mdi-map-search',
      access: {
        change: ['SuperAdmin', 'Map_editor'],
        read: ['View_only']
      }
    },
    {
      title: 'Edit polygons',
      route: 'polygons',
      disabled: 'polygons',
      icon: 'mdi-map-marker-path',
      access: {
        change: ['Map_editor', 'SuperAdmin'],
        read: ['View_only']
      }
    },
    {
      title: 'Edit building list',
      disabled: 'buildings',
      // route: 'buildings',
      icon: 'mdi-home-city-outline',
      access: {
        change: ['Map_editor', 'SuperAdmin'],
        read: ['View_only']
      },
      children: [
        {
          title: 'On-net buildings',
          route: 'lit-buildings',
          disabled: 'buildings',
          icon: 'mdi-home-map-marker'
        },
        {
          title: 'Footprint buildings',
          route: 'footprint-buildings',
          disabled: 'buildings',
          icon: 'mdi-home-map-marker'
        },
        {
          title: 'Construction commenced',
          route: 'build-buildings',
          disabled: 'buildings',
          icon: 'mdi-home-map-marker'
        },
        {
          title: 'Coming soon buildings',
          route: 'soon-buildings',
          disabled: 'buildings',
          icon: 'mdi-home-map-marker'
        },
        {
          title: 'Not available buildings',
          route: 'other-buildings',
          disabled: 'buildings',
          icon: 'mdi-home-map-marker'
        }
      ]
    },
    {
      title: 'Create Excel file',
      route: 'excel',
      disabled: 'buildings',
      icon: 'mdi-microsoft-excel',
      access: {
        change: ['Map_editor', 'SuperAdmin'],
        read: ['View_only']
      }
    }
  ]
}
