<template>
  <v-card flat class="transparent mx-auto mt-8" max-width="800" max-height="320">
    <Fieldset :legend="legend">
      <table class="my-5 mr-8" width="100%">
        <tbody>
          <tr>
            <td width="80" :class="login_pppoe_warn || login_ipoe_warn ? 'warning-value' : 'text-right pr-2'">
              Login
            </td>
            <td class="py-2">
              <v-text-field
                label="PPPOE"
                hide-details
                outlined
                dense
                v-model="login_pppoe"
              />
            </td>
            <td class="py-2">
              <v-text-field
                label="IPoE"
                hide-details
                outlined
                dense
                v-model="login_ipoe"
              />
            </td>
          </tr>

          <tr>
            <td width="120" :class="pwd_pppoe_warn || pwd_ipoe_warn ? 'warning-value' : 'text-right pr-2'">
              PWD
            </td>
            <td class="py-2">
              <v-text-field
                label="PPPOE"
                hide-details
                outlined
                dense
                v-model="pwd_pppoe"
              />
            </td>
            <td class="py-2">
              <v-text-field
                label="IPoE"
                hide-details
                outlined
                dense
                v-model="pwd_ipoe"
              />
            </td>
          </tr>

          <tr>
            <td :class="speedInWarn || speedOutWarn ? 'warning-value' : 'text-right pr-2'">
              Speed
            </td>
            <td class="py-2">
              <v-text-field
                label="Speed In"
                hide-details
                outlined
                dense
                v-model="speedIn"
              />
            </td>
            <td class="py-2">
              <v-text-field
                label="Speed Out"
                hide-details
                outlined
                dense
                v-model="speedOut"
              />
            </td>
          </tr>

          <tr>
            <td :class="ipWarn || routedSubnetWarn ? 'warning-value' : 'text-right pr-2'">
              IP
            </td>
            <td class="py-2">
              <v-text-field
                label="IP"
                hide-details
                outlined
                dense
                v-model="ip"
              />
            </td>
            <td class="py-2">
              <v-text-field
                label="Routed subnet"
                hide-details
                outlined
                dense
                v-model="routedSubnet"
              />
            </td>
          </tr>

          <tr>
            <td :class="vlanDgtekWarn || vlanRspWarn ? 'warning-value' : 'text-right pr-2'">
              VLAN
            </td>
            <td class="py-2">
              <v-text-field
                label="VLAN DGtek"
                hide-details
                outlined
                dense
                v-model="vlanDgtek"
              />
            </td>
            <td class="py-2">
              <v-text-field
                label="VLAN RSP"
                hide-details
                outlined
                dense
                v-model="vlanRsp"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </Fieldset>
  </v-card>
</template>

<script>

import { warningsController, customerController } from '@/components/customers/import/controllers'
import { connectionInfoWarnings } from '@/components/customers/import/helpers/customer-controller/connectionInfoWarnings'

import Fieldset from '@/components/Fieldset.vue'

const fields = Object.assign({}, ...Object.keys(connectionInfoWarnings).map(key => ({ [key]: false })))

export default {
  name: 'EditCustomerServiceConnectionInfo',

  props: ['index', 'serviceIndex'],

  components: {
    Fieldset
  },

  data: () => ({
    legend: 'Connection details',
    serviceName: customerController.getCurrentServiceName(),
    connectionData: customerController.getConnectionData(),
    ...fields
  }),

  computed: {
    login_pppoe: {
      get () {
        return this.connectionData?.Login?.PPPOE || ''
      },
      set (val) {
        this.update('Login.PPPOE', val)
      }
    },

    login_ipoe: {
      get () {
        return this.connectionData?.Login?.IPoE || ''
      },
      set (val) {
        this.update('Login.IPoE', val)
      }
    },

    pwd_pppoe: {
      get () {
        return this.connectionData?.PWD?.PPPOE || ''
      },
      set (val) {
        this.update('PWD.PPPOE', val)
      }
    },

    pwd_ipoe: {
      get () {
        return this.connectionData?.PWD?.IPoE || ''
      },
      set (val) {
        this.update('PWD.IPoE', val)
      }
    },

    speedIn: {
      get () {
        return this.connectionData ? this.connectionData['Speed In'] : 0
      },
      set (val) {
        this.update('Speed In', val)
      }
    },

    speedOut: {
      get () {
        return this.connectionData ? this.connectionData['Speed Out'] : 0
      },
      set (val) {
        this.update('Speed Out', val)
      }
    },

    ip: {
      get () {
        return this.connectionData?.IP || ''
      },
      set (val) {
        this.update('IP', val)
      }
    },

    routedSubnet: {
      get () {
        return this.connectionData ? this.connectionData['Routed subnet'] : ''
      },
      set (val) {
        this.update('Routed subnet', val)
      }
    },

    vlanDgtek: {
      get () {
        return this.connectionData ? this.connectionData['VLAN DGtek'] : ''
      },
      set (val) {
        this.update('VLAN DGtek', val)
      }
    },

    vlanRsp: {
      get () {
        return this.connectionData ? this.connectionData['VLAN RSP'] : ''
      },
      set (val) {
        this.update('VLAN RSP', val)
      }
    }
  },

  watch: {
    serviceIndex: {
      immediate: true,
      handler (val) {
        this.connectionData = customerController.getConnectionData()
      }
    }
  },

  methods: {
    refreshWarnings () {
      const index = customerController.getIndex()

      for (const key in connectionInfoWarnings) {
        this[key] = warningsController.getWarning(index, ...connectionInfoWarnings[key])
      }
    },

    update (propName, propValue) {
      customerController.updateConnectionData(propName, propValue)
      this.connectionData = customerController.getConnectionData()
    }
  },

  created () {
    this.refreshWarnings()
  },

  mounted () {
    if (!this.customerId) {
      this.$root.$on('warnings-updated', this.refreshWarnings)
    }
  },

  beforeDestroy () {
    this.customerId || this.$root.$off('warnings-updated', this.refreshWarnings)
  }
}
</script>

<style scoped>
table {
  width: 100%;
  margin-bottom: 48px;
}
tr {
  margin-bottom: 32px;
}
td {
  font-size: 14px;
  padding: 4px 12px;
}
.theme--light.v-application .text--primary {
  color: #900!important;
}

.invalid-value {
  color: #d00;
  text-align: center;
}

.warning-value {
  color: #fa0;
  text-align: right;
}

.invalid-value:before {
  content: '\26A0 ';
  color: #d00;
}

.warning-value:before {
  content: '\26A0 ';
  color: #fa0;
}

#service-autocomplete-container {
  position: relative;
}
#service-autocomplete-container > .v-autocomplete__content.v-menu__content {
  position: relative !important;
  top: 204px !important;
  left: 616px !important;
  max-height: 280px !important;
}
</style>
