import { searchRecordsByPostCode } from '../db/reports/buildings'

export const getRecordsByPostCode = postCode => searchRecordsByPostCode(postCode)
