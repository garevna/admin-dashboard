import { searchServiceByName } from '../db'

export const getServiceIdByServiceName = async serviceName => await searchServiceByName(serviceName)
