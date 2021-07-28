import { get, post, patch } from './'

export const uploadFile = {
  sla: async data => await post('sla', data),

  ticket: async (ticketId, data) => {
    const { files } = (await get('ticket', ticketId)).result
    files.push(data)
    return await patch(`ticket/${ticketId}`, files)
  },

  building: async (buildingId, subroute, data) => {
    return await post(`building/upload/${subroute}/${buildingId}`, { name: subroute, data })
  }
}
