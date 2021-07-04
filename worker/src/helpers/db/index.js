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
import { iterateCustomers } from './customers'

import { clearStore } from './clearStore'
import { putRecordByKey } from './putRecordByKey'

import { getRecordByKey } from './getRecordByKey'
import { getAllRecords } from './getAllRecords'
import { deleteRecordByKey } from './deleteRecordByKey'

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

  // putBooking,

  clearStore,
  putRecordByKey,
  // putScheduleRecord,
  getRecordByKey,
  deleteRecordByKey,
  getAllRecords,
  iterateCustomers
}
