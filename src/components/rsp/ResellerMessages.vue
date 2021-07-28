<template>
  <v-container>
    <v-row align="start" justify="center">
      <v-data-table
        :headers="headers"
        :items="messages"
        item-key="_id"
        :expanded.sync="expanded"
        single-expand
        show-expand
        class="elevation-1"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <p>
              <small v-html="item.content.split('\n').join('<br>')"></small>
            </p>
          </td>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small @click="deleteMessage(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ResellerMessages',

  props: ['details'],

  data: () => ({
    messages: [],
    selected: [],
    expanded: [],
    headers: [
      { text: 'Delete', value: 'actions', sortable: false },
      { text: 'Created', value: 'created' },
      { text: 'Modified', value: 'modified' },
      { text: 'Subject', value: 'subject' },
      { text: 'Content', value: 'data-table-expand' }
    ]
  }),

  watch: {
    selected (value) {
      //
    }
  },

  methods: {
    getData (data) {
      this.messages = data.map(item => Object.assign(item, {
        created: new Date(item.created).toISOString().slice(0, 10),
        modified: new Date(item.modified).toISOString().slice(0, 10)
      }))
    },
    deleteMessage (message) {
      console.log(message._id)
      // const index = this.messages.findIndex(item => item._id === this.selected._id)
      // console.log(index)
      // index !== -1 && this.messages.splice(index, 1)
    }
  },

  beforeMount () {
    this.$root.$on('messages-received', this.getData)
    this.__getMessages(this.details._id)
  },

  beforeDestroy () {
    this.$root.$off('messages-received', this.getData)
  }
}
</script>
