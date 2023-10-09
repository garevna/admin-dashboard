export const mapWorkerErrors = {
  address: (address) => ({
    type: address,
    message: 'Error reading building details from local DB'
  }),

  details: () => ({
    type: 'Building details',
    message: 'Error reading the data from local DB'
  }),

  list: () => ({
    type: 'Buildings list',
    message: 'Error reading the data from local DB'
  }),

  table: () => ({
    type: 'Buildings list',
    message: 'Error reading the data from local DB'
  }),

  post: (type = 'Add new building', message = 'New building was not created') => ({
    type,
    message
  }),

  patch: (type = 'Building details') => ({
    type,
    message: 'Data was not updated.'
  }),

  put: (type = 'Building details') => ({
    type,
    message: 'Data was not updated.'
  })

  // search: () => ({
  //   type: 'Search building',
  //   message: 'This building was not found in DB'
  // })
}
