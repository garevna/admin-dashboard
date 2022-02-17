import {
  dbName,
  storeNames,
  mainKeys,
  dbKeys,

  dbVersionHandler,
  correctVersionNumber,
  testDBVersion,
  upgradeNeededEventHandler,
  upgradeDB
} from './initDB'

// import { putBooking } from './putBooking'
import { iterateCustomers, getCustomersForExcel, updateStatistics } from './customers'

import { clearStore } from './clearStore'
import { putRecordByKey } from './putRecordByKey'

import { getRecordByKey } from './getRecordByKey'
import { getAllRecords } from './getAllRecords'
import { deleteRecordByKey } from './deleteRecordByKey'

import { countRecords } from './countRecords'

import { searchServiceByName } from './searchServiceByName'

export {
  dbName,
  storeNames,
  mainKeys,
  dbKeys,

  dbVersionHandler,
  correctVersionNumber,
  testDBVersion,
  upgradeNeededEventHandler,
  upgradeDB,

  searchServiceByName,

  clearStore,
  putRecordByKey,
  getRecordByKey,
  countRecords,
  deleteRecordByKey,
  getAllRecords,
  iterateCustomers,
  updateStatistics,
  getCustomersForExcel
}
