export const uploads = {
  ticket: {
    route: 'ticket',
    method: 'PATCH',
    propName: 'files',
    label: 'Ticket files',
    type: 'pdf',
    scheme: 'string',
    accept: 'application/pdf'
  },
  sla: {
    route: 'sla',
    method: 'POST',
    propName: 'sla',
    label: 'SLA',
    type: 'pdf',
    scheme: 'string',
    accept: 'application/pdf'
  },
  building: {
    method: 'POST',
    design: {
      propName: 'design',
      label: 'Design',
      type: 'pdf',
      scheme: 'string',
      accept: 'application/pdf'
    },
    inspect: {
      propName: 'laanInspect',
      label: 'LAAN Inspect',
      type: 'pdf',
      scheme: 'string',
      accept: 'application/pdf'
    },
    install: {
      propName: 'laanInstall',
      label: 'LAAN Install',
      type: 'pdf',
      scheme: 'string',
      accept: 'application/pdf'
    },
    scope: {
      propName: 'scope',
      label: 'Scope',
      type: 'pdf',
      scheme: 'string',
      accept: 'application/pdf'
    },
    approoval: {
      propName: 'approoval',
      label: 'Approval',
      type: 'pdf',
      scheme: 'string',
      accept: 'application/pdf'
    },
    photos: {
      propName: 'photos',
      label: 'Photos',
      type: 'image',
      scheme: 'array',
      accept: 'image/*'
    }
  }
}
