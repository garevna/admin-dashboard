const { openDB } = require('../../openDB')

module.exports = async function () {
  const { status, result: db } = await openDB()

  console.log(status)

  const data = db.transaction('customers')
    .objectStore('customers')
    .index('postCode')
    .get('3000')

  console.log(data)
}
