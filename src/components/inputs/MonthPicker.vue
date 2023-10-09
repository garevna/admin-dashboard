<template>
  <v-card flat class="transparent" style="position: relative" width="360">
    <table>
      <tr>
        <td>
          <v-btn outlined color="#900" max-width="360" @click="open = true" v-html="buttonText" style="display: inline-block!important">
          </v-btn>
        </td>
        <td>
          <v-icon v-if="month" color="#900" @click="picker = ''" style="display: inline-block!important">
            mdi-calendar-remove
          </v-icon>
        </td>
      </tr>
    </table>

    <v-dialog v-model="open" max-width="290">
      <v-date-picker
        v-model="picker"
        type="month"
        width="290"
        color="#900"
      />
    </v-dialog>
  </v-card>
</template>

<script>

export default {
  name: 'MonthPicker',

  props: ['title', 'month'],

  data: () => ({
    open: false
    // picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
  }),

  computed: {
    picker: {
      get () {
        return this.month || new Date().toISOString().slice(0, 10)
      },
      set (value) {
        this.open = false
        this.$emit('update:month', value)
      }
    },
    buttonText () {
      return `${this.title || 'Month of service activation '} <b style="margin-left: 8px"> ${this.month || ''}</b>`
    }
  }
}
</script>

<style scoped>
.theme--light.v-picker__body {
  background: $fbfbfb !important;
}
</style>
