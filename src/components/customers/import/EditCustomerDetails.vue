<template>
    <v-card flat class="transparent mx-auto">
      <table>
        <tbody>
          <tr>
            <td class="text-right"> Creation date </td>
            <td>
              <v-text-field
                v-model="customer.customerCreationDate"
                label="Creation date"
                outlined
                dense
                hide-details
              />
            </td>
            <td>
              <v-text-field
                v-model="customer.uniqueCode"
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
                v-model="customer.commercial.companyName"
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
                v-model="customer.commercial.companyAbn"
                label="Company ABN"
                :rules="[rules.required, rules.abn]"
                outlined
                dense
                hide-details
              />
            </td>
          </tr>
          <tr>
            <td class="text-right">Address</td>
            <td>
              <v-text-field
                v-model="customer.apartmentNumber"
                label="apt"
                outlined
                dense
                hide-details
                style="width: 120px"
              />
            </td>
            <td>
              <v-select
                :items="buildings"
                v-model="customer.address"
                @input="updateBuildingId"
                hide-details
                outlined
                dense
                label="address"
                :menu-props="{ bottom: true, offsetY: true }"
              />
            </td>
          </tr>
          <tr>
            <td class="text-right"> Customer name </td>
            <td>
              <v-text-field
                v-model="customer.firstName"
                label="First name"
                :rules="[rules.required]"
                outlined
                dense
                hide-details
              />
            </td>
            <td>
              <v-text-field
                v-model="customer.lastName"
                label="Last name"
                :rules="[rules.required]"
                outlined
                dense
                hide-details
              />
            </td>
          </tr>
          <tr>
            <td class="text-right" > Phones </td>
            <td>
              <v-text-field
                v-model="customer.phoneWork"
                label="Phone (work)"
                :rules="[rules.phone]"
                outlined
                dense
                hide-details
              />
            </td>
            <td>
              <v-text-field
                v-model="customer.phoneMobile"
                label="Phone (mobile)"
                :rules="[rules.required, rules.mobile]"
                outlined
                dense
                hide-details
              />
            </td>
          </tr>

          <tr>
            <td class="text-right" > Email </td>
            <td>
              <v-text-field
                v-model="customer.primaryEmail"
                label="Email (primary)"
                :rules="[rules.required, rules.email]"
                outlined
                dense
                hide-details
              />
            </td>
            <td>
              <v-text-field
                v-model="customer.alternativeEmail"
                label="Phone (mobile)"
                :rules="[rules.email]"
                outlined
                dense
                hide-details
              />
            </td>
          </tr>

          <!-- <tr v-for="(prop, propName) in customerDetailsSchema" :key="propName">
            <td class="text-right" >{{ prop.title }}</td>
            <td>
              <v-text-field
                v-if="textField(prop)"
                v-model="prop.value"
                @input="update(propName, prop.value)"
                :label="prop.title"
                :rules="[prop.required ? rules.required : (value) => true, rule(prop)]"
                outlined
                dense
                hide-details
              />
              <v-text-field
                v-if="prop.type === 'mobile'"
                v-model="prop.value"
                @input="update(propName, prop.value)"
                prefix="+61"
                :rules="[prop.required && !customerDetailsSchema.phoneWork.value ? rules.required : (value) => true, rules.mobile]"
                label="mobile phone number"
                outlined
                dense
                hide-details
              ></v-text-field>
            </td>
          </tr> -->

          <!-- <tr style="height: 48px;"></tr> -->

          <!-- <tr style="margin-top: 48px!important">
              <td colspan="2" class="text-right">
              <v-spacer />
              <v-btn dark class="buttons" @click="saveCustomerDetails">
                Update details
              </v-btn>
            </td>
          </tr> -->
        </tbody>
      </table>
    </v-card>
</template>

<script>

import { testTextField } from '@/helpers'
import { SwitchValues } from '@/components/inputs'

const { customerSchema, rules } = require('@/configs').default

const { customerDetails, commercial } = customerSchema

export default {
  name: 'EditCustomerDetails',

  components: {
    SwitchValues
  },

  props: {
    customer: Object
  },

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    customerDetails: null,
    customerDetailsSchema: customerDetails,
    buildingData: null,
    commercialSchema: commercial,
    rules: rules,
    buildings: [],
    customerType: null
  }),

  computed: {
    buildingId: {
      get () {
        return this.customer.buildingId
      },
      set (value) {
        this.customer.buildingId = value
      }
    }
  },

  watch: {
    customerType: {
      handler (newVal, oldVal) {
        console.log(oldVal, '=>', newVal)
        if (newVal && (!this.customer.commercial || !Object.keys(this.customer.commercial))) {
          this.customer.commercial = this.commercialSchema
        }
      }
    }
  },
  methods: {
    changeUniqueCode () {
      const code = `${this.customer.uniqueCode.split('.').slice(0, -1).join('.')}.${this.customer.apartmentNumber}`
      this.customer.uniqueCode = code
      this.customerDetailsSchema.uniqueCode.value = code
    },

    update (propName, propValue) {
      this.customer[propName] = propValue
    },

    updateBuildingId () {
      this.__getBuildingByAddress(this.customer.address)
    },

    rowHeight (item) {
      return item.type === 'textarea' ? 160 : 60
    },

    textField (item) {
      return testTextField(item.type)
    },

    rule (item) {
      return this.rules[item.type]
    },

    createSchema () {
      if (this.customer.commercial && Object.keys(this.customer.commercial).length > 0) {
        this.customerType = true
        this.commercialSchema.companyName.value = this.customer.commercial.companyName
        this.commercialSchema.companyAbn.value = this.customer.commercial.companyAbn
      }
      this.customerDetailsSchema = customerSchema.customerDetails
      for (const prop in this.customerDetailsSchema) {
        this.customerDetailsSchema[prop].value = this.customer[prop]
      }
    },

    getCustomerData (data) {
      this.customer = data.result
      this.createSchema()

      const { buildingId } = data.result

      if (buildingId) {
        this.__getBuildingById(buildingId)
      }
    },

    getBuildings (data) {
      this.buildings.push(...data)
    },

    saveCustomerDetails () {
      if (!this.customerType) this.customer.commercial = null
      // this.__putCustomer(this.customer._id, this.customer)
    },

    close () {
      this.$parent.$emit('update:initialCustomer', this.customer)
    }
  },

  // beforeDestroy () {
  //   this.$root.$off('customer-updated', this.close)
  //   this.$root.$off('customer-created', this.close)
  // },

  mounted () {
    this.customerDetails = this.__clone(this.customer)
    this.worker.getBuildingsListForTable('lit', this.getBuildings)
    this.createSchema()

    // this.$root.$on('customer-updated', this.close)
    // this.$root.$on('customer-created', this.close)
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
  /* border: dotted 1px red; */
  font-size: 14px;
  padding: 4px 12px;
}
.theme--light.v-application .text--primary {
  color: #900!important;
}
</style>
