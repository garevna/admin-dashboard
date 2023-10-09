<template>
  <v-toolbar flat :color="toolBarColor || 'primary'" dark style="z-index: 15">
    <v-toolbar-title>
      <small><b>{{ selected }}</b></small>
    </v-toolbar-title>
    <v-spacer />
    <v-btn icon @click="showMenuOptions = !showMenuOptions">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-list
      v-if="showMenuOptions"
      light
      class="menu-list"
    >
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        @click="selectedItem = item; showMenuOptions = !showMenuOptions"
        dense
        style="margin: -8px 0 !important;"
      >
        <v-list-item-title class="menu-list-item">
          {{ item }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-toolbar>
</template>

<script>

export default {
  name: 'DropDownMenu',

  props: ['items', 'selected', 'index', 'toolBarColor'],

  data: () => ({
    showMenuOptions: false
  }),

  computed: {
    selectedItem: {
      get () {
        return this.selected
      },
      set (val) {
        this.$emit('update:selected', val)
        this.$emit('update:index', this.items.indexOf(val))
      }
    }
  }
}
</script>

<style scoped>

.menu-list {
  position: absolute !important;
  top: 60px !important;
  right: 32px !important;
  z-index: 16 !important;
  box-shadow: 0px 0px 8px #000b !important;
  border-radius: 0px;
  max-height: 340px;
  overflow-y: auto;
  border: solid 12px transparent;
  box-sizing: border-box;
}

.menu-list-item {
  margin-top: -16px !important;
  margin-bottom: -16px !important;
  line-height: 24px !important;
}

.menu-list-item:hover {
  color: #900;
}
</style>
