<template>
  <v-card flat class="transparent mx-auto mb-12 pt-8" max-width="1008" min-width="1008" v-if="dialog">
    <v-row justify="end">
      <v-btn icon @click="$emit('update:dialog', false)">
        <v-icon large>mdi-close</v-icon>
      </v-btn>
    </v-row>

    <v-row justify="center" v-if="ready">
      <Fieldset legend="Customer details">
        <EditCustomerDetails :initialCustomer.sync="customer" />
      </Fieldset>

    </v-row>
    <v-row justify="center">
      <v-btn outlined text color="buttons" @click="$emit('update:dialog', false)">Exit</v-btn>
    </v-row>
  </v-card>
</template>

<script>

import Fieldset from '@/components/Fieldset.vue'

export default {
  name: 'CustomerDetails',
  components: {
    Fieldset,
    EditCustomerDetails: () => import('@/components/customers/EditCustomerDetails.vue')
  },
  props: ['customerId', 'initialAddressData', 'dialog'],
  data: () => ({
    ready: false,
    section: 'Service details',
    customer: null,
    buildingDetails: null,
    buildingId: null,
    update: false
  }),

  methods: {
    getCustomerDetails (data) {
      this.customer = data
      this.buildingId = this.customer.buildingId
      this.ready = true
    },

    close () {
      this.$emit('update:dialog', false)
      this.$root.$emit('go-to-customers-list')
    }
  },

  beforeDestroy () {
    this.$root.showMainMenu = true
    this.$root.$off('customer-data-received', this.getCustomerDetails)
  },

  beforeMount () {
    this.$root.showMainMenu = false
  },

  mounted () {
    if (this.customerId) {
      this.$root.$on('customer-data-received', this.getCustomerDetails)
      this.__getCustomerData(this.customerId)
    }
  }
}
</script>

<style scoped>
.border {
  border: 1px solid #881F1A;
  background: #fff!important;
  /* color: #900!important; */
}
</style>
