<template>
  <div id="select-status-container">
    <v-autocomplete
      attach="#select-status-container"
      v-model="selected"
      :items="statusList"
      :search-input.sync="search"
      outlined
      dense
      hide-details
      label="Service status"
      clearable
    />
  </div>
</template>

<script>

export default {
  name: 'SelectServiceStatus',

  props: ['status'],

  data: () => ({
    statusList: [],
    search: ''
  }),

  computed: {
    selected: {
      get () {
        return this.status
      },
      set (val) {
        this.$emit('update:status', val)
      }
    }
  },

  methods: {
    getStatusList (data) {
      this.statusList = data
    }
  },

  created () {
    this.__getAvailableServiceStatus(this.getStatusList)
  }
}
</script>

<style scoped>
#select-status-container {
  position: relative;
}
#select-status-container > .v-autocomplete__content.v-menu__content {
  position: relative !important;
  top: 204px !important;
  left: 616px !important;
  max-height: 280px !important;
}
</style>
