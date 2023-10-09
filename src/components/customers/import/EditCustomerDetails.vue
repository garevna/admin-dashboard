<template>
    <v-card flat class="transparent mx-auto" v-if="ready" max-width="1080" style="padding-bottom: 120px!important">
      <table>
        <tbody>
          <tr>
            <td :class="customerCreationDateError ? 'invalid-value' : 'text-right'" width="180">
              Creation date
            </td>
            <td width="320">
              <DatePicker :date.sync="creationDate" />
            </td>
            <td :class="!uniqueCode ? 'invalid-value' : 'text-right'" width="320">
              <v-text-field
                v-model="uniqueCode"
                label="Unique code"
                outlined
                dense
                hide-details
              />
            </td>
          </tr>
          <tr>
            <td>
              <SwitchValues
                label="Residential/commercial"
                :value.sync="customerType"
                :states="['residential', 'commercial']"
                hide-details
                class="mb-8"
              />
            </td>
            <td v-if="customerType === 'commercial'">
              <span>Company name</span>
              <v-text-field
                v-model="companyName"
                label="Company name"
                :rules="[rules.required]"
                outlined
                dense
                hide-details
              />
            </td>
            <td v-if="customerType === 'commercial'">
              <span>Company ABN</span>
              <v-text-field
                v-model="companyAbn"
                label="Company ABN"
                :rules="[rules.required, rules.abn]"
                outlined
                dense
                hide-details
              />
            </td>
          </tr>
          <tr>
            <td :class="fatalError ? 'invalid-value' : 'text-right'">
              Address
            </td>
            <td>
              <v-text-field
                v-model="apartmentNumber"
                label="apt"
                outlined
                dense
                hide-details
                style="width: 120px"
              />
            </td>
            <td>
              <SearchBuildingByAddress
                :buildingId.sync="buildingId"
                :address.sync="address"
                :buildingUniqueCode.sync="buildingUniqueCode"
                :postCode.sync="postCode"
              />
            </td>
          </tr>
          <tr>
            <td :class="firstNameError || lastNameError ? 'invalid-value' : 'text-right'">
              Customer name
            </td>
            <td>
              <v-text-field
                v-model="firstName"
                label="First name"
                :rules="[rules.required]"
                outlined
                dense
                hide-details
              />
            </td>
            <td>
              <v-text-field
                v-model="lastName"
                label="Last name"
                :rules="[rules.required]"
                outlined
                dense
                hide-details
              />
            </td>
          </tr>
          <tr>
            <td :class="phoneMobileError ? 'invalid-value' : 'text-right'">
              Phones
            </td>
            <td>
              <v-text-field
                v-model="phoneWork"
                label="Phone (work)"
                :rules="[rules.phone]"
                outlined
                dense
                hide-details
              />
            </td>
            <td>
              <v-text-field
                v-model="phoneMobile"
                label="Phone (mobile)"
                :rules="[rules.required, rules.mobile]"
                prefix="+61"
                outlined
                dense
                hide-details
              />
            </td>
          </tr>

          <tr>
            <td :class="primaryEmailError ? 'invalid-value' : 'text-right'">
              Email
            </td>
            <td>
              <v-text-field
                v-model="primaryEmail"
                label="Email (primary)"
                :rules="[rules.required, rules.email]"
                outlined
                dense
                hide-details
              />
            </td>
            <td>
              <v-text-field
                v-model="alternativeEmail"
                label="Email (alternative)"
                :rules="[rules.email]"
                outlined
                dense
                hide-details
              />
            </td>
          </tr>
        </tbody>
      </table>
    </v-card>
</template>

<script>

import {
  customerController,
  fatalErrorsController,
  errorsController
} from '@/components/customers/import/controllers'

import { requiredFields } from '@/components/customers/import/helpers/customer-controller/customerRequiredFields'

import DatePicker from '@/components/inputs/DatePicker.vue'
import SwitchValues from '@/components/inputs/SwitchValues.vue'

const { rules } = require('@/configs').default

export default {
  name: 'EditCustomerDetails',

  components: {
    DatePicker,
    SwitchValues,
    SearchBuildingByAddress: () => import('@/components/inputs/SearchBuildingByAddress.vue')

  },

  props: {
    index: Number
  },

  data: () => ({
    ready: false,
    worker: window[Symbol.for('map.worker')],
    customer: customerController.getValue(),
    partnerUniqueCode: '',
    fatalError: false,
    uniqueCodeError: false,
    firstNameError: false,
    lastNameError: false,
    primaryEmailError: false,
    phoneMobileError: false,
    postCodeError: false,
    customerCreationDateError: false,
    rules: rules,
    changed: false
  }),

  computed: {
    customerType: {
      get () {
        return this.customer.commercial ? 'commercial' : 'residential'
      },
      set (val) {
        if (val) {
          this.companyName = ''
          this.companyAbn = ''
        }
      }
    },

    buildingUniqueCode: {
      get () {
        const uniqueCodeArray = this.customer.uniqueCode.split('.')
        this.partnerUniqueCode = uniqueCodeArray.shift()
        uniqueCodeArray.pop()
        console.log(uniqueCodeArray.join('.'))
        return uniqueCodeArray.join('.')
      }
    },

    companyName: {
      get () {
        return this.customer.commercial ? this.customer.commercial.companyName : null
      },
      set (val) {
        customerController.updateCommercial('companyName', val)
        this.customer = customerController.getValue()
      }
    },

    companyAbn: {
      get () {
        return this.customer.commercial ? this.customer.commercial.companyAbn : null
      },
      set (val) {
        customerController.updateCommercial('companyAbn', val)
        this.customer = customerController.getValue()
      }
    },

    creationDate: {
      get () {
        return this.customer.customerCreationDate
      },
      set (val) {
        this.updateProperty('customerCreationDate', val)
      }
    },

    uniqueCode: {
      get () {
        return this.customer.uniqueCode
      },
      set (val) {
        this.updateProperty('uniqueCode', val)
      }
    },

    apartmentNumber: {
      get () {
        return this.customer.apartmentNumber
      },
      set (val) {
        this.updateProperty('apartmentNumber', val)
      }
    },

    address: {
      get () {
        return this.customer.address
      },
      set (addr) {
        console.log('ADDRESS CHANGED: ', addr)
        Object.assign(this.customer, { address: addr })
        // customerController.updateBuilding(building)
        // this.customer = customerController.getValue()
        // console.log(this.customer.buildingId, this.customer.address)
      }
    },

    buildingId: {
      get () {
        return this.customer.buildingId
      },
      set (val) {
        Object.assign(this.customer, { buildingId: val })
      }
    },

    // building: {
    //   get () {
    //     return {
    //       address: this.customer.address,
    //       buildingId: this.customer.buildingId
    //     }
    //   },
    //   set (build) {
    //     console.log(build)
    //     customerController.updateBuilding(build)
    //     this.customer = customerController.getValue()
    //     console.log(this.customer.buildingId, this.customer.address)
    //   }
    // },

    firstName: {
      get () {
        return this.customer.firstName
      },
      set (val) {
        this.updateProperty('firstName', val)
      }
    },

    lastName: {
      get () {
        return this.customer.lastName
      },
      set (val) {
        this.updateProperty('lastName', val)
      }
    },

    phoneWork: {
      get () {
        return this.customer.phoneWork
      },
      set (val) {
        this.updateProperty('phoneWork', val)
      }
    },

    phoneMobile: {
      get () {
        return this.customer.phoneMobile.split('+61').join('')
      },
      set (val) {
        this.updateProperty('phoneMobile', `+61${val}`)
      }
    },

    primaryEmail: {
      get () {
        return this.customer.primaryEmail
      },
      set (val) {
        this.updateProperty('primaryEmail', val)
      }
    },

    alternativeEmail: {
      get () {
        return this.customer.alternativeEmail
      },
      set (val) {
        this.updateProperty('alternativeEmail', val)
      }
    }
  },

  watch: {
    index (val) {
      this.customer = customerController.getValue()
    }
  },

  methods: {
    updateProperty (propName, propValue) {
      customerController.updateProperty(propName, propValue)
      this.customer = customerController.getValue()
    },

    refreshFatalError () {
      this.fatalError = fatalErrorsController.getBuildingError(this.index)
    },

    refreshErrors () {
      for (const propName of requiredFields) {
        this[`${propName}Error`] = errorsController.getError(this.index, propName)
      }
    },

    changeType (type) {
      if (type === 'commercial') {
        if (!customerController.getValue().commercial) {
          ['companyName', 'companyAbn'].forEach(key => customerController.updateCommercial(key, ''))
        }
      } else customerController.updateCommercial()
    },

    getPartnerDetails (details) {
      customerController.setPartner({ id: details._id, uniqueCode: details.uniqueCode })
      this.ready = true
    }
  },

  created () {
    this.__getResellerDetails(this.customer.resellerId, this.getPartnerDetails)
  },

  beforeMount () {
    this.buildings = this.address ? [this.address] : ['']
    this.customer = customerController.getValue()
  },

  mounted () {
    console.log('CUSTOMER:\n', this.customer)
    this.refreshFatalError()
    this.refreshErrors()
    this.$root.$on('fatal-errors-updated', this.refreshFatalError)
    this.$root.$on('errors-updated', this.refreshErrors)
  },

  beforeDestroy () {
    this.$root.$off('fatal-errors-updated', this.refreshFatalError)
    this.$root.$off('errors-updated', this.refreshErrors)
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
  text-align: right;
}

.invalid-value:before {
  content: '\26A0 ';
  color: #d00;
}

#autocomplete-container {
  position: relative;
}
#autocomplete-container > .v-autocomplete__content.v-menu__content {
  position: relative !important;
  top: 204px !important;
  left: 616px !important;
  max-height: 280px !important;
}
</style>
