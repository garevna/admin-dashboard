<template>
  <v-menu
    v-model="menu"
    close-on-content-click
    transition="scale-transition"
    max-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="localDate"
        :label="title"
        prepend-icon="mdi-calendar"
        readonly
        outlined
        hide-details
        color="primary"
        v-bind="attrs"
        v-on="on"
        max-width="320"
        class="mx-auto"
      />
    </template>
    <v-date-picker
      v-model="localDate"
      @input="menu = false"
      color="primary"
      :first-day-of-week="1"
      no-title
      scrollable
    />
  </v-menu>
</template>

<script>

export default {
  name: 'DatePicker',
  props: ['title', 'date'],
  data: () => ({
    menu: false,
    modal: false
  }),
  computed: {
    localDate: {
      get () {
        return this.date || new Date().toISOString().substr(0, 10)
      },
      set (value) {
        this.$emit('update:date', value)
      }
    }
  }
}
</script>
