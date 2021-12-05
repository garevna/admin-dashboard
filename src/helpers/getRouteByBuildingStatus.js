export const getRouteByBuildingStatus = (status) => {
  const index = ['LIT', 'Footprint', 'BuildCommenced', 'ComingSoon', 'Other'].indexOf(status)
  const routeName = ['lit', 'footprint', 'build', 'soon', 'other'][index]
  return `${routeName}-buildings`
}
