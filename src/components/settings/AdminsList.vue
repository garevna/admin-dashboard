<template>
  <v-card v-if="ready" flat class="transparent mx-auto mb-12" max-width="600">
    <v-data-table
      :headers="headers"
      :items="admins"
      item-key="login"
      single-expand
      :expanded.sync="expanded"
      show-expand
      class="transparent"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          color="primary"
          :disabled="accessRights !== 2"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <EditAdminDetails :id="item.id" />
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>

import { roleHandler, accessRightsHandler } from '@/controllers/data-handlers'

export default {
  name: 'AdminsList',

  components: {
    EditAdminDetails: () => import('@/components/settings/EditAdminDetails.vue')
  },

  data: () => ({
    accessRights: accessRightsHandler().access[roleHandler()].access,
    expanded: [],
    admins: null,
    ready: false,
    headers: [
      { text: 'Actions', value: 'actions', sortable: false },
      {
        text: 'Role',
        align: 'start',
        value: 'role'
      },
      { text: 'Phone Number', value: 'phoneNumber' },
      { text: 'login', value: 'login' },
      { text: '', value: 'data-table-expand' }
    ]
  }),

  methods: {
    getAdmins (data) {
      this.admins = data.filter(user => user.login !== process.env.VUE_APP_DEFAULT_ADMIN_LOGIN)
      this.ready = true
    },

    deleteItem (item) {
      console.log('DELETE:\n', item)
      // this.__deleteUser(item.id, callback)
    },

    callback () {
      //
    }
  },

  beforeMount () {
    this.__getAdmins(this.getAdmins)
  }
}
</script>
