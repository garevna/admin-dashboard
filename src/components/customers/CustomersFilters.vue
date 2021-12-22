<template>
  <v-card flat class="transparent">
    <table>
      <tbody>
        <tr>
          <td>
            <v-select
              v-if="statuses"
              :items="statuses"
              v-model="localStatus"
              label="Service status"
              outlined
              clearable
              dense
              color="primary"
              style="width: 200px"
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-select>
          </td>
          <td>
            <v-select
              :items="types"
              v-model="localType"
              label="Service type"
              outlined
              clearable
              dense
              color="primary"
              style="width: 160px"
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-select>
          </td>
          <td>
            <v-select
              v-if="services"
              :items="services"
              v-model="localServiceName"
              label="Services"
              outlined
              clearable
              dense
              color="primary"
              style="width: 240px"
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-select>
          </td>
        </tr>
      </tbody>
    </table>
    <v-spacer />
    <v-btn text @click="$emit('update:refresh', true)" class="mb-5">
      <v-icon>mdi-refresh</v-icon>
      Refresh
    </v-btn>
    <v-btn icon @click="$emit('update:hardRefresh', true)" class="mb-5">
      <v-icon>mdi-database-refresh</v-icon>
    </v-btn>
  </v-card>
</template>

<script>

export default {
  name: 'CustomersFilters',

  props: ['status', 'type', 'serviceName', 'refresh', 'hardRefresh'],

  data: () => ({
    statuses: null,
    services: null,
    types: ['residential', 'commercial']
  }),

  computed: {
    localStatus: {
      get () { return this.status },
      set (value) { this.$emit('update:status', value) }
    },
    localType: {
      get () { return this.type },
      set (value) { this.$emit('update:type', value) }
    },
    localServiceName: {
      get () { return this.serviceName },
      set (value) { this.$emit('update:serviceName', value) }
    }
  },

  methods: {
    getStatusList (data) {
      this.statuses = data
    },
    getListOfServices (data) {
      this.services = data
    }
  },

  created () {
    this.__getAvailableServiceStatus(this.getStatusList)
    this.__getShortListOfServices(this.getListOfServices)
  }
}
</script>
