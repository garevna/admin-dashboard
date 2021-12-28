<template>
  <v-card flat class="transparent mx-auto mb-12 pt-8" width="900" v-if="dialog">
    <v-row justify="end">
      <v-btn icon @click="$emit('update:dialog', false)" class="close-button">
        <v-icon large>mdi-close</v-icon>
      </v-btn>
    </v-row>

    <v-row justify="center" v-if="ready" style="margin-top: -42px">
      <Fieldset legend="Customer details" style="width: 900px">
        <ShowCustomerDetails :initialCustomer.sync="customer" />
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
    ShowCustomerDetails: () => import('@/components/customers/ShowCustomerDetails.vue')
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
  },

  beforeMount () {
    this.$root.showMainMenu = false
  },

  mounted () {
    if (this.customerId) {
      this.__getCustomerData(this.customerId, this.getCustomerDetails)
    }
  }
}
</script>

<style scoped>
.close-button {
  margin-right: -4px;
  background: #fbfbfb;
  border: solid 1px #999;
  padding-left: 8px;
}

.border {
  border: 1px solid #881F1A;
  background: #fff!important;
  /* color: #900!important; */
}
</style>
