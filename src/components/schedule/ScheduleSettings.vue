<template>
  <v-card flat class="transparent mx-auto" width="360">
    <table>
      <tbody>
        <tr v-for="(day, index) of days" :key="index">
          <td width="100">{{ day }}</td>
          <td width="100">
            <v-text-field v-model="settings[index]" outlined dense hide-details />
          </td>
        </tr>
      </tbody>
    </table>

    <v-btn dark color="primary" @click="updateSetting" class="mt-8">
      Save updates
    </v-btn>
  </v-card>
</template>

<script>

export default {
  name: 'ScheduleSettings',

  data: () => ({
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    settings: []
  }),

  methods: {
    getSettings (data) {
      console.log(data)
      this.settings = data
    },
    updateSetting () {
      this.__updateScheduleSettings(this.settings.map(item => parseInt(item)))
    }
  },

  beforeDestroy () {
    this.$root.$off('schedule-settings-received', this.getSettings)
  },

  beforeMount () {
    this.$root.$on('schedule-settings-received', this.getSettings)
    this.__getScheduleSettings()
  }
}
</script>
