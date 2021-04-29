export const mapWorkerErrors = {
  getByAddress: (address) => ({
    type: address,
    message: 'Error reading building details from local DB'
  }),

  getById: () => ({
    type: 'Building details',
    message: 'Error reading the data from local DB'
  }),

  list: () => ({
    type: 'Buildings list',
    message: 'Error reading the data from local DB'
  }),

  data: () => ({
    type: 'Buildings list',
    message: 'Error reading the data from local DB'
  }),

  post: (type = 'Add new building') => ({
    type,
    message: 'New building was not created'
  }),

  put: (type = 'Building details') => ({
    type,
    message: 'Data was not updated.'
  })
}
