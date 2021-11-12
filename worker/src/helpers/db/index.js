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
import { iterateCustomers, getCustomersForExcel } from './customers'

import { clearStore } from './clearStore'
import { putRecordByKey } from './putRecordByKey'

import { getRecordByKey } from './getRecordByKey'
import { getAllRecords } from './getAllRecords'
import { deleteRecordByKey } from './deleteRecordByKey'

import { countRecords } from './countRecords'

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

  clearStore,
  putRecordByKey,
  getRecordByKey,
  countRecords,
  deleteRecordByKey,
  getAllRecords,
  iterateCustomers,
  getCustomersForExcel
}
