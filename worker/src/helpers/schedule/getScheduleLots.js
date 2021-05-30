import { get } from '../AJAX'

export const getScheduleLots = async function () {
  return Object.assign(await get('slot'), { route: 'lots', action: 'get' })
}
