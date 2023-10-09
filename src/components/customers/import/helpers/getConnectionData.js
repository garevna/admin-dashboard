export function getConnectionData (customer) {
  return {
    Login: {
      PPPOE: customer['Login PPPOE'] || customer.Login_PPPOE || customer.login_PPPOE || customer.login_pppoe || '',
      IPoE: customer['Login IPoE'] || customer.loginIPoE || customer.login_IPoE || customer.login_ipoe || ''
    },
    PWD: {
      PPPOE: customer['PWD PPPOE'] || customer.PWD_PPPOE || customer.pwd_PPPOE || customer.pwd_pppoe || '',
      IPoE: customer['PWD IPoE'] || customer.PWD_IPoE || customer.pwd_IPoE || customer.pwd_ipoe || ''
    },
    'Speed In': customer['Speed In'] || customer.speedIn || customer.speed_in || 0,
    'Speed Out': customer['Speed Out'] || customer.speedOut || customer.speed_out || 0,
    IP: customer.IP || customer.ip || '',
    'Routed subnet': customer['Routed subnet'] || customer.Routed_subnet || customer.routedSubnet || customer.routed_subnet || '',
    'VLAN DGtek': customer['VLAN DGtek'] || customer.VLAN_DGtek || customer.VLAN_DGtek || customer.vlan_dgtek || '',
    'VLAN RSP': customer['VLAN RSP'] || customer['vlan rsp'] || customer.VLAN_RSP || customer.vlanRsp || customer.vlan_rsp || ''
  }
}
