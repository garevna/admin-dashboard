<template>
  <v-card flat class="transparent" style="position: relative" width="240">
    <v-toolbar flat class="transparent">
      <v-text-field
        v-model="localDate"
        :label="title"
        prepend-inner-icon="mdi-calendar"
        outlined
        dense
        hide-details
        color="primary"
        @click="showPicker = true"
        style="cursor: pointer !important"
      />
    </v-toolbar>
    <v-date-picker
      v-if="showPicker"
      v-model="localDate"
      @input="showPicker = false"
      color="primary"
      :first-day-of-week="1"
      :min="minDate"
      :max="maxDate"
      no-title
      scrollable
      style="position: absolute; top: 54px; left: 16px; min-width: 290px !important; border: solid 1px #bbb !important; z-index: 25; box-shadow: 0 0 4px #0004"
    />
  </v-card>
</template>

<script>

export default {
  name: 'DatePicker',

  props: ['title', 'date', 'minDate', 'maxDate'],

  data: () => ({
    showPicker: false
  }),

  computed: {
    localDate: {
      get () {
        return this.date || new Date().toISOString().slice(0, 10)
      },
      set (value) {
        this.$emit('update:date', value)
      }
    }
  }
}
</script>

<style scoped>
.theme--light.v-picker__body {
  background: $fbfbfb !important;
}
</style>
