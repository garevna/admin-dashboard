<template>
  <v-card flat class="transparent mx-auto text-center" max-width="960">
    <v-card-title class="my-8">
      <h5>
        <small> Available service status </small>
      </h5>
    </v-card-title>

    <v-expansion-panels flat class="transparent">
      <v-expansion-panel v-for="(item, index) of items" :key="index">
        <v-expansion-panel-header>
          <b style="color: #900">{{ item.title }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="pt-5" style="background: #eee">
          <v-row align="start" justify="center">
            <v-col cols="5" class="text-left">
              <b>Pendind connections</b>
              <v-checkbox
                v-model="item.pending.admin"
                label="For Admin"
                dense
                hide-details
              />
              <v-checkbox
                v-model="item.pending.partner"
                label="For Partner"
                dense
                hide-details
              />
            </v-col>
            <v-col cols="5">
              <v-radio-group v-model="item.type">
                <v-radio
                  label="Booking"
                  value="booking"
                ></v-radio>
                <v-radio
                  label="Scheduling"
                  value="scheduling"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-card flat class="transparent mx-auto mt-5" max-width="360">
            <b>Can be switched to status (by admin):</b>
            <v-checkbox
              v-for="status of filterItems(item.title)"
              :key="status.title"
              :label="status.title"
              @change="updateSwitchToItems(item, status)"
              dense
              hide-details
            />
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>

export default {
  name: 'AvailableServiceStatusUpdates',

  data: () => ({
    items: null,
    ready: false
  }),

  methods: {
    updateSwitchToItems (item, selected) {
      item.switchToStatus.includes(selected.title)
        ? item.switchToStatus.splice(item.switchToStatus.indexOf(selected.title), 1)
        : item.switchToStatus.push(selected.title)
    },
    getData (data) {
      this.items = data.map(item => ({
        title: item,
        pending: {
          admin: false,
          partner: false
        },
        type: 'booking',
        booking: false,
        scheduling: false,
        switchToStatus: []
      }))

      this.ready = true
    },

    filterItems (itemTitle) {
      return this.items.filter(item => item.title !== itemTitle)
    },

    save () {
      this.__updateAvailableServiceStatus(this.items, this.showAnswer)
    }
  },

  mounted () {
    this.__getAvailableServiceStatus(this.getData)
  }
}
</script>

<style>

table {
  border-collapse: collapse;
}

th {
  padding: 0 16px;
  border: 0;
}

td {
  padding: 4px 16px;
  /* border: solid 1px #ddd; */
}
</style>
