export const footprint = {
  title: 'Footprint',
  refresh: 'buildings',
  disabled: 'footprint',
  icon: 'mdi-map',
  children: [
    {
      title: 'Search address',
      route: 'footprint',
      disabled: 'buildings',
      icon: 'mdi-map-search'
    },
    {
      title: 'Edit polygons',
      route: 'polygons',
      disabled: 'polygons',
      icon: 'mdi-map-marker-path'
    },
    {
      title: 'Pits',
      route: 'pits',
      disabled: 'pits',
      icon: 'mdi-minecraft'
    },
    {
      title: 'Edit building list',
      disabled: 'buildings',
      icon: 'mdi-home-city-outline',
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
      icon: 'mdi-microsoft-excel'
    },
    {
      title: 'Export to csv',
      route: 'export-to-csv',
      disabled: 'buildings',
      icon: 'mdi-file-delimited'
    }
  ]
}
