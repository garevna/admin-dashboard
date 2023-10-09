<template>
  <v-text-field
    type="number"
    v-model="value"
    label="Discount"
    outlined
    dense
    class="my-1"
    hide-details
    :append-outer-icon="icon"
    @click:append-outer="changeUnits"
  />
</template>

<script>

export default {
  name: 'Discount',

  props: ['discountValue', 'discountUnits'],

  computed: {
    icon () {
      return this.units === '%' ? 'mdi-percent' : 'mdi-currency-usd'
    },

    value: {
      get () {
        return this.discountValue
      },
      set (val) {
        this.$emit('update:discountValue', val)
      }
    },

    units: {
      get () {
        return this.discountUnits
      },
      set (val) {
        this.$emit('update:discountUnits', val)
      }
    }
  },

  methods: {
    changeUnits (value) {
      this.units = this.units === '%' ? '$' : '%'
    }
  }
}

</script>
