import { post } from '../AJAX'
import { putRecordByKey } from '../db'

const [route, action] = ['documents', 'post']

export const postDocument = async (data) => {
  if (!data.folder || !data.title) return self.errorMessage('invalidRequest')

  const { status, result } = await post('documents', data)

  if (status !== 200) return self.errorMessage('createNewDocumentError')

  const { folder, title, partners } = data

  await putRecordByKey('documents', result.data, { folder, title, partners, _id: result.data })

  return {
    status,
    route,
    action,
    result,
    message: true,
    messageType: 'New document',
    messageText: `Document ${title} created in folder ${folder}`
  }
}
