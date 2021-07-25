<template>
  <v-row justify="center">
    <v-toolbar class="transparent" style="box-shadow: none">
      <v-autocomplete
        v-model="addressId"
        :loading="loading"
        :items="variants"
        item-text="address"
        item-value="id"
        :search-input.sync="search"
        cache-items
        flat
        hide-no-data
        hide-details
        :placeholder="buildingAddressData.address"
        outlined
        dense
        @change="notSubmited"
        :style="{ background: color }"
      />

      <v-btn text @click="submit" color="primary">SUBMIT</v-btn>
    </v-toolbar>
  </v-row>
</template>

<script>
export default {
  name: 'GeoscapeAutocomplete',

  props: ['buildingAddressData'],

  data: () => ({
    addressId: '',
    addressData: {},
    variants: [],
    loading: false,
    search: null,
    color: 'transparent'
  }),

  watch: {
    addressId: {
      immediate: true,
      handler (val) {
        this.address = val
      }
    },
    search (val) {
      val && val !== this.select && this.getVariants(val)
    }
  },

  methods: {
    notSubmited () {
      this.color = '#9004'
    },

    async submit () {
      if (!this.addressId) return
      this.color = 'transparent'
      await this.getAddressDetails()
      this.$emit('update:buildingAddressData', this.addressData)
    },

    async getVariants (val) {
      if (val.length < 4) return
      this.loading = true
      this.variants = (await (await fetch(`https://api.psma.com.au/v1/predictive/address?maxNumberOfResults=20&query=${encodeURIComponent(val)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.$geoscapeKey()
        }
      })).json()).suggest

      this.loading = false
    },

    async getAddressDetails () {
      const response = await (await fetch(`https://api.psma.com.au/v1/addresses/${this.addressId}?include=geo,addressDetails`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.$geoscapeKey()
        }
      })).json()

      const {
        cadastralIdentifier,
        localityName: city,
        postcode: postCode,
        stateTerritory: state,
        streetName: street,
        streetType,
        streetNumber1,
        streetNumber2
      } = response.addressDetails

      this.addressData = {
        address: response.addressDetails.formattedAddress,
        addressComponents: {
          cadastralIdentifier,
          addressId: response.addressId,
          city,
          postCode,
          state,
          street,
          streetType,
          streetNumber1,
          streetNumber2,
          number: streetNumber2 ? `${streetNumber1}-${streetNumber2}` : streetNumber1
        },
        coordinates: response.geo.geometry.coordinates,
        relatedBuildingIds: response.relatedBuildingIds
      }
    }
  }
}
</script>

<style>
::placeholder {
  color: #555!important;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
 color: #555!important;
}

::-ms-input-placeholder { /* Microsoft Edge */
 color: #555!important;
}
</style>
