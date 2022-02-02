import { put } from '../AJAX'

const [route, action] = ['lots', 'update']

export const updateScheduleLots = async function () {
  const currentDate = new Date().toISOString().slice(0, 10)

  const { result: lots } = await self.getScheduleLots()

  Object.keys(lots).filter(date => date >= currentDate)

  return Object.assign(await put('slot', lots), { route, action })
}
