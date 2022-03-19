<template>
  <v-card v-if="ready" flat class="transparent mx-auto" max-width="600">
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

export default {
  name: 'AdminsList',

  components: {
    EditAdminDetails: () => import('@/components/settings/EditAdminDetails.vue')
  },

  data: () => ({
    expanded: null,
    admins: null,
    ready: false,
    headers: [
      {
        text: 'Role',
        align: 'start',
        value: 'role'
      },
      { text: 'Phone Number', value: 'phoneNumber' },
      { text: 'login', value: 'login' }
    ]
  }),

  methods: {
    getAdmins (data) {
      console.log('ADMINS:\n', data)
      this.admins = data
      this.ready = true
    },

    deleteItem (item) {
      console.log('DELETE:\n', item)
    }
  },

  beforeMount () {
    this.__getAdmins(this.getAdmins)
  },

  mounted () {
    //
  }
}
</script>
