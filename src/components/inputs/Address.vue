<template>
  <v-card flat>
    <v-card-text>
      <input
        id="autocompleteAddress"
        class="input-field"
        :style="{ borderColor: borderColor }"
        v-model="localAddress"
        placeholder="Address"
      />
      <v-card-text>
        <p style="color: #09b" v-if="address">{{ address }}</p>
        <p style="color: #f50" v-if="message">{{ message }}</p>
      </v-card-text>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'Address',
  props: ['address'],
  data () {
    return {
      borderColor: '#bbb',
      message: '',
      map: null
    }
  },
  computed: {
    localAddress: {
      get () {
        return this.address
      },
      set (val) {
        this.$emit('update:address', val)
      }
    }
  },
  methods: {
    initAutocomplete () {
      let counter = 0
      return new Promise(function recurse (resolve, reject) {
        if (counter++ === 30) reject(new Error('Error accessing Google maps API'))
        if (!window.google || !document.getElementById('autocompleteAddress')) setTimeout(() => recurse(resolve, reject), 100)
        else {
          resolve({
            inputElement: document.getElementById('autocompleteAddress'),
            Autocomplete: window.google.maps.places.Autocomplete
          })
        }
      })
    },

    getAddressComponents (place) {
      if (!place.geometry) {
        this.borderColor = '#900'
        this.message = 'Invalid address'
        return {
          street: '',
          locality: '',
          admin1: '',
          admin2: '',
          postCode: ''
        }
      }
      this.message = ''
      this.$emit('update:address', place.formatted_address)
      this.$emit('update:coordinates', [place.geometry.location.lng(), place.geometry.location.lat()])

      const components = [
        { name: 'subnumber', value: 'subpremise' },
        { name: 'number', value: 'street_number' },
        { name: 'street', value: 'route' },
        { name: 'city', value: 'locality' },
        { name: 'state', value: 'administrative_area_level_1' },
        { name: 'admin', value: 'administrative_area_level_2' },
        { name: 'postCode', value: 'postal_code' }
      ].map(item => ({ [item.name]: this.getInfo(item.value, place.address_components) }))

      this.$emit('update:properties', Object.assign({}, ...components))
    },

    getInfo (type, details) {
      const res = details.find(item => item.types[0] === type)
      return res ? res.short_name : ''
    },

    async initAddressInputField () {
      try {
        var { inputElement, Autocomplete } = await this.initAutocomplete()
      } catch (err) {
        console.warn(err)
        return
      }
      this.autocomplete = new Autocomplete(inputElement, { componentRestrictions: { country: 'au' } })
      this.autocomplete.addListener('place_changed', function (event) {
        const place = this.autocomplete.getPlace()
        this.getAddressComponents(place)
        const location = place.geometry.location
        this.$emit('update:coordinates', [location.lng(), location.lat()])
      })
    }
  },
  mounted () {
    setTimeout(this.initAddressInputField.bind(this), 1000)
  }
}
</script>

<style>

.input-field {
  display: inline-block;
  outline: none;
  width: 85%;
  padding: 16px 32px;
  border: solid 1px #bbb;
  border-radius: 48px;
}
.input-field:focus {
  outline: none;
  border: solid 1px #09b;
}
</style>
