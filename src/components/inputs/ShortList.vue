<template>
  <v-card flat class="transparent" style="border: solid 1px #ddd!important">
    <v-toolbar height="48" class="transparent toolbar-simple">
      <v-toolbar-title>
        <h5><small>{{ title }}</small></h5>
      </v-toolbar-title>
    </v-toolbar>

    <v-list
      dense
      :height="height || 360"
      width="100%"
      class="list-simple"
    >
      <v-list-item
        v-for="item of list"
        :key="item.id"
        @click="select(item)"
        :class="getClass(item)"
        :disabled="disabled && Boolean(disabled.find(elem => elem.id === item.id))"
      >
        <small>{{ item.text }}</small>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>

export default {
  name: 'ShortList',

  props: ['title', 'list', 'selected', 'height', 'disabled'],

  data: () => ({
    selectedItem: null
  }),

  watch: {
    disabled (data) {
      if (data && this.selectedItem && data.find(item => item.id === this.selectedItem.id)) this.$emit('update:selected', null)
    },
    selected (val) {
      if (!val) {
        this.selectedItem = null
      }
    }
  },

  methods: {
    getClass (item) {
      return this.selectedItem && item.id === this.selectedItem.id ? 'theme--dark list-item-active' : ''
    },
    select (item) {
      this.selectedItem = item
      this.$emit('update:selected', item.id)
    }
  }
}
</script>

<style>
.list-item-active {
  color: #fff !important;
  background: #900;
}

.toolbar-simple {
  box-shadow: none !important;
  border-bottom: solid 1px #ddd !important;
}

.list-simple {
  overflow-y: auto;
  border: solid 1px #ddd;
}
</style>
