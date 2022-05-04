<template>
  <v-card flat class="transparent mx-auto text-center" max-width="800">
    <v-card-title class="my-8">
      <h5><small color="prim">List of connection statuses to be shown as <em>pending</em></small></h5>
    </v-card-title>
    <v-row justify="center">
      <v-col cols="6" lg="4" xl="3" class="text-left">
        <p><b>for partner</b></p>
        <v-card flat class="transparent my-0 py-1">
          <div v-for="(item, index) of partnerSettings" :key="item.name">
            <v-checkbox
              v-model="item.selected"
              @click="updatePartnerSettings(item, index)"
              :label="item.name"
              color="primary"
              dense
              hide-details
            />
          </div>
        </v-card>
      </v-col>
      <v-col cols="6" lg="4" xl="3" class="text-left">
        <p><b>for admin</b></p>
        <v-card flat class="transparent my-0 py-1">
          <div v-for="(item, index) of adminSettings" :key="item.name">
            <v-checkbox
              v-model="item.selected"
              @click="updateAdminSettings(item, index)"
              :label="item.name"
              color="primary"
              dense
              hide-details
            />
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="end" class="my-8">
      <v-btn dark class="primary" @click="save()" text>
        Save
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'PendingConnectionStatus',

  data: () => ({
    items: null,
    partnerPending: null,
    adminPending: null
  }),

  computed: {
    ready () {
      return this.items && this.partnerPending && this.adminPending
    },

    partnerSettings () {
      return this.ready ? this.items.map(item => ({ name: item, selected: this.partnerPending.includes(item) })) : null
    },

    adminSettings () {
      return this.ready ? this.items.map(item => ({ name: item, selected: this.adminPending.includes(item) })) : null
    }
  },

  methods: {
    updatePartnerSettings (item, index) {
      //
    },

    updateAdminSettings (item, index) {
      //
    },

    getAvailable (data) {
      this.items = data
    },

    getPending (data) {
      this.partnerPending = data.partner
      this.adminPending = data.admin
    },

    showAnswer (response) {
      // console.log('Pending connection status:\n', response)
    },

    save () {
      const admin = this.adminSettings.filter(item => item.selected).map(item => item.name)
      const partner = this.partnerSettings.filter(item => item.selected).map(item => item.name)

      this.__updatePendingConnectionSettings({ admin, partner }, this.showAnswer)
    }
  },

  mounted () {
    this.__getAvailableServiceStatus(this.getAvailable)
    this.__getPendingConnectionStatus(this.getPending)
  }
}
</script>
