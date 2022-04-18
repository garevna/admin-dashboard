let accessRights = {
  access: {},
  dashboard: [],
  roles: []
}

export const accessRightsHandler = function (value) {
  if (!value) return accessRights
  accessRights = value
}
