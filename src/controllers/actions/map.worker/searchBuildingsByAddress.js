const createPromise = (index, address) => new Promise(resolve => {
  setTimeout(() => window[Symbol.for('map.worker')].getBuildingDetailsByAddress(address.toUpperCase(), resolve), 5 * index)
})

export const searchBuildingsByAddress = async function (addressList, resolve) {
  const result = {}

  const set = Array.from(new Set(addressList))

  for (let index = 0; index < set.length; index++) {
    const building = await createPromise(index, set[index])
    result[set[index]] = building ? building._id : null
  }

  resolve(addressList.map(address => result[address]))
}
