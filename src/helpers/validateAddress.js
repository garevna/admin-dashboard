export function validateAddress (options) {
  if (!window.google.maps) {
    return { error: 'App is not ready to perform this action' }
  }
  if (!options.streetNumber || !options.streetName || !options.locality || !options.state || !options.postCode) {
    return { error: 'Insufficient data to search address' }
  }

  const geocode = (new window.google.maps.Geocoder()).geocode
  const request = {
    address: `${options.streetNumber} ${options.streetName}, ${options.locality} ${options.state} ${options.postCode}`,
    componentRestrictions: {
      country: 'AU',
      locality: options.locality,
      postalCode: options.postCode,
      route: options.streetName
    }
  }

  return new Promise(function (resolve) {
    geocode(request, function (results, status) {
      if (status !== 'OK') return resolve({ error: status })

      const latLng = results[0].geometry.location
      const [number, street, city, state, admin, postCode] = [
        'street_number',
        'route',
        'locality',
        'administrative_area_level_1',
        'administrative_area_level_2',
        'postal_code'
      ].map(name => results[0].address_components.find(item => item.types[0] === name))
        .map(item => item ? item.short_name : '')

      resolve({
        formattedAddress: results[0].formatted_address,
        formattedCoordinates: [latLng.lng(), latLng.lat()],
        properties: {
          number,
          street,
          city,
          state,
          admin,
          postCode
        }
      })
    })
  })
}
