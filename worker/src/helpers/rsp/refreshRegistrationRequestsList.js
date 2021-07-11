export const refreshRegistrationRequestsList = async () => {
  const response = await self.getResellersFromRemoteServer()
  return response.status !== 200 ? response : await self.getRegistrationRequests()
}
