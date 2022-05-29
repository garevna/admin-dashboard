import { clearStore, putRecordByKey } from '../../'
import { initialValues } from '../'

const [route, action] = ['reports', 'partners-creation']

export const createPartnersReport = async () => {
  clearStore('partners')

  const { result } = await self.getResellersShortList()

  await Promise.all(result.map(record => putRecordByKey('partners', record.id, Object.assign({ _id: record.id }, record, initialValues))))

  return Object.assign({ status: 200, route, action, result })
}
