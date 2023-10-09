import { accessSettingsHandler } from '../../data-handlers'
import { roleHandler } from '../env'

export const getAccessRights = route => accessSettingsHandler().access[roleHandler()][route]
