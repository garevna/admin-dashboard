import { accessError } from '../../configs'
import { getAccessRights } from '../admin/getAccessRights'

export const testAccessError = () => getAccessRights('services') !== 2 ? accessError : null
