<template>
  <div id="select-partner-container">
    <v-autocomplete
      attach="#select-partner-container"
      v-model="selected"
      :items="partners"
      item-value="id"
      item-text="name"
      :search-input.sync="search"
      outlined
      dense
      hide-details
      label="Partner"
      clearable
    />
  </div>
</template>

<script>

// import { customerFiltersHandler } from '@/helpers/data-handlers'

export default {
  name: 'SelectPartner',

  props: ['partnerId'],

  data: () => ({
    partners: [],
    search: ''
  }),

  computed: {
    selected: {
      get () {
        return this.partnerId ? this.partners.find(item => item.id === this.partnerId) : null
      },
      set (val) {
        this.$emit('update:partnerId', val)
      }
    }
  },

  methods: {
    getResellersList (data) {
      this.partners = data.map(partner => ({
        name: partner.company.name,
        id: partner._id
      }))
    }
  },

  created () {
    this.__getResellersList(this.getResellersList)
  }
}
</script>

<style scoped>
#select-partner-container {
  position: relative;
}
#select-partner-container > .v-autocomplete__content.v-menu__content {
  position: relative !important;
  top: 204px !important;
  left: 616px !important;
  max-height: 280px !important;
}
</style>
