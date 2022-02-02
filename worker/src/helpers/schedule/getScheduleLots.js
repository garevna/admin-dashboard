import { get } from '../AJAX'

const [route, action] = ['lots', 'get']

export const getScheduleLots = async function () {
  return Object.assign(await get('slot'), { route, action })
}
