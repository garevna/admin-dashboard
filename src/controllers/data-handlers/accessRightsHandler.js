let accessRights = {}

export const accessRightsHandler = function (value) {
  if (!value) return accessRights
  accessRights = value
}
