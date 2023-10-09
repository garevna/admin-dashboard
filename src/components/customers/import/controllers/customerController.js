import * as methods from '../helpers/customer-controller'

import { fatalErrorsController, errorsController, warningsController } from './'

class CustomerController {
  constructor () {
    this.root = window[Symbol.for('vue.instance')]

    let partnerServices = []
    this.setPartnerServices = services => {
      partnerServices = services
      this.emitEvent('partner-services-updated', partnerServices)
    }
    this.getPartnerServices = () => partnerServices
    this.getServiceNameById = serviceId => partnerServices.find(item => item.id === serviceId)?.name || 'Service is not defined'
    this.getCurrentServiceName = () => this.serviceIndex !== -1
      ? this.service
        ? this.service.id ? partnerServices.find(item => item.id === this.service.id)?.name : ''
        : ''
      : ''

    this.index = undefined
    this.clear()
    this.partnerUniqueCode = ''
    this.serviceIndex = -1
  }

  setIndex (index) {
    this.index = index
  }

  getIndex () {
    return this.index
  }

  setPartner (partner) {
    if (partner) {
      this.resellerId = partner.id
      this.partnerUniqueCode = partner.uniqueCode
      this.partnerName = partner.name
      if (partner.services) this.setPartnerServices(partner.services)
      else this.resellerId && this.root.__getPartnerServices(this.resellerId, this.setPartnerServices)
    }
  }

  getPartnerUniqueCode () {
    return this.partnerUniqueCode
  }

  getPartnerId () {
    return this.resellerId
  }

  updateBuilding (building) {
    console.log('CUSTOMER CONTROLLER RECEIVED BUILDING DATA TO UPDATE:\n', building)
    const { address, buildingId, buildingUniqueCode, postCode } = building
    const uniqueCode = this.changeUniqueCode(buildingUniqueCode)
    Object.assign(this, { address, buildingId, uniqueCode, postCode })

    fatalErrorsController.testCustomer(this.getValue(), this.getIndex())
    errorsController.testCustomer(this.getValue(), this.getIndex())
    warningsController.testCustomer(this.getValue(), this.getIndex())

    this.emitEvent()
  }

  getValue () {
    return Object.assign({}, this.getCustomerDetailsToSave(this), {
      index: this.index,
      services: this.getCustomerServicesToSave()
    })
  }

  getValueToSave () {
    return Object.assign({}, this.getCustomerDetailsToSave(this), {
      services: this.getCustomerServicesToSave()
    })
  }

  emitEvent (eventName = 'customer-details-updated') {
    this.root.$emit(eventName, this.getValue())
  }

  showError (message) {
    console.warn(`${message}: Service index is not defined!`, this.serviceIndex)
    return null
  }
}

Object.assign(CustomerController.prototype, methods.result)

export const customerController = new CustomerController()
