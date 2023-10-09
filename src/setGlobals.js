export const setGlobals = () => {
  window[Symbol.for('global.addressData')] = {
    address: '',
    coordinates: null,
    buildingId: null,
    status: null,
    addressComponents: {},
    url: null
  }

  window.addEventListener('dgtek-portal-map-package-error', function (event) {
    console.log(event.detail)
  })
}
