<template>
  <v-card flat class="transparent mx-auto text-center" max-width="960">
    <v-card-title class="my-8">
      <h5>
        <small>Estimated service delivery time settings</small>
      </h5>
    </v-card-title>
    <table class="mx-auto">
      <thead>
        <th style="min-width: 140px; color: #999"> Status </th>
        <th style="min-width: 200px; color: #999"> Status to display </th>
        <th style="color: #999"> Estimated service delivery time </th>
        <th style="color: #999">  </th>
      </thead>
      <tbody>
        <tr v-for="type of types" :key="type">
          <td class="text-left mr-8">
            <b>{{ type }}</b>
          </td>
          <td>
            <v-text-field
              v-model="data[type].toDisplay"
              outlined
              dense
              hide-details
            />
          </td>
          <td>
            <v-text-field
              v-model="data[type].value"
              outlined
              dense
              hide-details
            />
          </td>
          <td>
            <v-checkbox
              label="Disable new customer creation"
              v-model="data[type].newCustomerDisabled"
              dense
              hide-details
              class="ml-2"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <v-card-actions class="my-12">
      <v-spacer />
      <v-btn dark class="primary" @click="save()" text>
        Save updates
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: 'EstimatedServiceDeliveryTime',

  data: () => ({
    types: null,
    data: null,
    ready: false
  }),

  methods: {
    update (value, index) {
      this.items[index] = value
    },
    getData (data) {
      this.types = Object.keys(data)
      this.data = data
      this.ready = true
    },
    emitEvent (response) {
      this.$root.$emit('settings-updated')
    },
    save () {
      this.__updateEstimatedServiceDeliveryTime(this.data, this.emitEvent)
    }
  },

  mounted () {
    this.__getEstimatedServiceDeliveryTime('all', this.getData)
  }
}
</script>
