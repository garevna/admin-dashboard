import { accessError } from '../../configs'
import { getAccessRights } from '../admin/getAccessRights'

export const testAccessError = () => {
  const accessRights = getAccessRights('services')
  self.postDebugMessage({ proc: 'testAccessError', accessRights })
  return accessRights !== 2 ? accessError : null
}
