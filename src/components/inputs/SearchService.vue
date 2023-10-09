<template>
  <div id="service-search-container">
    <v-autocomplete
      attach="#service-search-container"
      v-model="selected"
      :items="filtered"
      item-text="name"
      :search-input.sync="search"
      return-object
      outlined
      dense
      hide-details
      label="Service"
      clearable
    />
  </div>
</template>

<script>

export default {
  name: 'SearchService',

  props: ['serviceId', 'type', 'partnerId'],

  data: () => ({
    services: [],
    search: ''
  }),

  computed: {
    selected: {
      get () {
        return this.serviceId ? this.services.find(item => item.id === this.serviceId) : null
      },
      set (service) {
        this.$emit('update:serviceId', service?.id || null)
      }
    },

    filtered () {
      return this.filterByPartner(this.filterByType(this.services))
    }
  },

  methods: {
    clearSelection () {
      this.$emit('update:serviceId', null)
    },

    filterByPartner (services) {
      return !this.partnerId
        ? services
        : services.filter(service => service.partners.includes(this.partnerId))
    },

    filterByType (services) {
      return !this.type
        ? services
        : services.filter(service => service.type === this.type)
    },

    getServiceList (services) {
      this.services = services
    }
  },

  watch: {
    partnerId (id) {
      if (!id) return
      if (!this.selected?.partners.includes(id)) {
        this.selected = null
      }
    },

    serviceId (id) {
      this.$emit('update:serviceId', id)
    }
  },

  created () {
    this.__searchServices(this.search, this.getServiceList)
  }
}
</script>

<style scoped>
#service-search-container {
  position: relative;
}
#service-search-container > .v-autocomplete__content.v-menu__content {
  position: relative !important;
  top: 204px !important;
  left: 616px !important;
  max-height: 280px !important;
}
</style>
