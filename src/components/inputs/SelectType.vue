<template>
  <div id="select-type-container">
    <v-autocomplete
      attach="#select-type-container"
      v-model="selected"
      :items="types"
      :search-input.sync="search"
      outlined
      dense
      hide-details
      label="Type"
      clearable
    />
  </div>
</template>

<script>

// import { customerFiltersHandler } from '@/helpers/data-handlers'

export default {
  name: 'SelectType',

  props: ['type'],

  data: () => ({
    types: ['residential', 'commercial'],
    search: ''
  }),

  computed: {
    selected: {
      get () {
        return this.type
      },
      set (val) {
        this.$emit('update:type', val)
      }
    }
  }
}
</script>

<style scoped>
#select-type-container {
  position: relative;
}
#select-type-container > .v-autocomplete__content.v-menu__content {
  position: relative !important;
  top: 204px !important;
  left: 616px !important;
  max-height: 280px !important;
}
</style>
