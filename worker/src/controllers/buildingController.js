import { get, post } from '../helpers/AJAX'

// const sections = ['design', 'inspect', 'approoval', 'scope', 'install']

// const uploadError = {
//   error: true,
//   errorType: 'Building files'
// }

// const fileSectionError = Object.assign(uploadError, { errorMessage: 'Invalid section name' })
// const buildingIdError = Object.assign(uploadError, { errorMessage: 'Building is not defined' })

// const testSection = section => section && sections.indexOf(section)

class BuildingController {
  async getFileContent (request) {
    const [route, action] = ['files', 'get']
    const { buildingId, section } = request

    // if (!buildingId) return self.postMessage(Object.assign(buildingIdError, { route, action, section, buildingId }))
    // if (!testSection(section)) return self.postMessage(Object.assign(fileSectionError, { route, action, section }))

    const response = await get(`building/upload/${section}/${buildingId}`)

    self.postMessage(Object.assign(response, { route, action, section, buildingId }))
  }

  async postFile (request) {
    const [route, action] = ['files', 'create']
    const { buildingId, section, data } = request
    // if (!buildingId) return self.postMessage(Object.assign(buildingIdError, { route, action, buildingId }))
    // if (!testSection(section)) return self.postMessage(Object.assign(fileSectionError, { route, action }))

    const response = Object.assign(await post(`building/upload/${section}/${buildingId}`, { name: section, data }), {
      route,
      action,
      section,
      buildingId,
      message: true,
      messageType: 'Upload file',
      messageText: `File ${section} has been uploaded`
    })

    self.postMessage(Object.assign(response, response))
  }

  async excel (request) {
    self.postMessage(await self.createBuildingExcelFile(request.data))
  }

  async convertToKML () {
    self.postMessage(await self.convertToKML())
  }
}

export const buildingController = new BuildingController()
