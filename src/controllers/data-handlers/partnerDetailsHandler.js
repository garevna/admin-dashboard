const { partnerSchema } = require('../../configs').default

let partnerDetails = JSON.parse(JSON.stringify(partnerSchema))

const executor = function (value) {
  if (!value) return partnerDetails
  partnerDetails = JSON.parse(JSON.stringify(value))
}

export const partnerDetailsHandler = Object.assign(executor, {
  reset: () => {
    partnerDetails = JSON.parse(JSON.stringify(partnerSchema))
  }
})
