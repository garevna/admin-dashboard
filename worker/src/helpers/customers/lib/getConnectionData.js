import { getKey } from './'

export function getConnectionData (customer) {
  const findKey = getKey.bind(null, Object.keys(customer))

  const [
    loginPPPOEKey,
    loginIPoEKey,
    pwdPPPOEKey,
    pwdIPoEKey,
    speedInKey,
    speedOutKey,
    // ipKey,
    routedSubnetKey,
    vlanDgtekKey,
    vlanRspKey
  ] = [
    findKey(['login', 'pppoe']),
    findKey(['login', 'ipoe']),
    findKey(['pwd', 'pppoe']) || findKey(['password', 'pppoe']),
    findKey(['pwd', 'ipoe']) || findKey(['password', 'ipoe']),
    findKey(['speed', 'in']),
    findKey(['speed', 'out']),
    findKey(['routed', 'subnet']),
    findKey(['vlan', 'dgtek']),
    findKey(['vlan', 'rsp'])
  ]
  return {
    Login: {
      PPPOE: customer[loginPPPOEKey],
      IPoE: customer[loginIPoEKey]
    },
    PWD: {
      PPPOE: customer[pwdPPPOEKey],
      IPoE: customer[pwdIPoEKey]
    },
    'Speed In': customer[speedInKey],
    'Speed Out': customer[speedOutKey],
    IP: customer.IP || customer.ip || '',
    'Routed subnet': customer[routedSubnetKey],
    'VLAN DGtek': customer[vlanDgtekKey],
    'VLAN RSP': customer[vlanRspKey]
  }
}
