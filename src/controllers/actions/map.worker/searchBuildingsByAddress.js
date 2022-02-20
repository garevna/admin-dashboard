const createPromise = (index, address) => new Promise(resolve => {
  setTimeout(() => window[Symbol.for('map.worker')].getBuildingDetailsByAddress(address.toUpperCase(), resolve), 5 * index)
})

export const searchBuildingsByAddress = async function (addressList, resolve) {
  const result = []

  for (const address of addressList) {
    const index = addressList.indexOf(address)
    const building = await createPromise(index, address)
    result[index] = building ? building._id : null
  }

  resolve(result)
}
