import { get, post } from '../helpers/AJAX'
import { access } from '../configs'

// const sections = ['design', 'inspect', 'approoval', 'scope', 'install']

const sectionNames = {
  design: 'Design',
  inspect: 'Inspect',
  approoval: 'Approval',
  scope: 'Scope',
  install: 'Install'
}

// const uploadError = {
//   error: true,
//   errorType: 'Building files'
// }

// const fileSectionError = Object.assign(uploadError, { errorMessage: 'Invalid section name' })
// const buildingIdError = Object.assign(uploadError, { errorMessage: 'Building is not defined' })

// const testSection = section => section && sections.indexOf(section)

class BuildingController {
  async getGroupOfBuildingsDetails (request) {
    self.postMessage(await self.getGroupOfBuildingsDetails(request.list, request.props))
  }

  async getMasterList (request) {
    self.postMessage(await self.getMasterBuildingsList(request.list))
  }

  getBuildingsByPostCode (request) {
    const callback = response => self.postMessage(response)
    self.getBuildingsByPostCode(request.postCode, callback)
  }

  async getFileContent (request) {
    const [route, action] = ['files', 'get']
    const { buildingId, section } = request

    // if (!buildingId) return self.postMessage(Object.assign(buildingIdError, { route, action, section, buildingId }))
    // if (!testSection(section)) return self.postMessage(Object.assign(fileSectionError, { route, action, section }))

    const response = await get(`building/upload/${section}/${buildingId}`)

    self.postMessage(Object.assign(response, { route, action, section, buildingId }))
  }

  async postFile (request) {
    if (!access.buildings) return { status: 403 }
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
      messageText: `File ${sectionNames[section]} has been uploaded`
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
