export const infrastructureFields = {
  type: {
    title: 'Infrastructure type',
    selected: false,
    width: 15
  },
  gPOinMDF: {
    title: 'GPO in MDF',
    selected: false,
    children: {
      planned: {
        title: 'GPO in MDF planned',
        width: 17
      },
      installed: {
        title: 'GPO in MDF installed',
        width: 17.5
      },
      exist: {
        title: 'GPO in MDF exist',
        width: 17
      }
    }
  },
  uPSinMDF: {
    title: 'UPS in MDF',
    selected: false,
    children: {
      planned: {
        title: 'UPS in MDF planned',
        width: 17
      },
      installed: {
        title: 'UPS in MDF installed',
        width: 17.5
      }
    }
  }
}
