import { partialSearchService } from '../db'

// const [route, action] = ['services', 'partial-search']

export const partialServiceSearch = async searchString => {
  const response = await partialSearchService(searchString)

  return response
}
