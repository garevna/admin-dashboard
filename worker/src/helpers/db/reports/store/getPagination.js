module.exports = (store, size) => new Promise((resolve, reject) => {
  Object.assign(store.getAllKeys(), {
    onsuccess: async event => {
      const [list, result] = [event.target.result.sort(), []]
      while (list.length) {
        const res = list.splice(0, size)
        const [min, max] = [res[0], res.slice(-1)[0]]
        result.push([min, max])
      }
      resolve(result)
    },
    onerror: event => reject(event.target.result)
  })
})
