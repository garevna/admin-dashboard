const statusParams = {
  Active: {
    title: 'Activation date',
    propName: 'activationDate'
  },
  Suspended: {
    title: 'Suspention date',
    propName: 'suspendedDate'
  },
  'Awaiting to be suspended': {
    title: 'Date to suspend',
    propName: 'suspendDate'
  },
  Canceled: {
    title: 'Cancelation date',
    propName: 'canceledDate'
  },
  'Awaiting for cancelation': {
    title: 'Date to be canceled',
    propName: 'cancelDate'
  },
  Resumed: {
    title: 'Date of resuming',
    propName: 'resumedDate'
  },
  'Awaiting to be resumed': {
    title: 'Date to be resumed',
    propName: 'resumeDate'
  }
}

function getStatusParams () {
  if (this.serviceIndex === -1 || !this.services[this.serviceIndex]) {
    this.showError('Service not defined')
    return {}
  }

  const status = this.services[this.serviceIndex].status
  return statusParams[status] || {}
}

export function getStatusDateTitle () {
  const params = getStatusParams.call(this)
  return params.title || ''
}

export function getStatusDatePropName () {
  const params = getStatusParams.call(this)
  return params.propName || null
}
