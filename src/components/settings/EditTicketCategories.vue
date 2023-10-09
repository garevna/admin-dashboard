<template>
  <v-card flat class="transparent mx-auto text-center" max-width="480">
    <v-card-title class="my-8">
      <h5><small> Ticket categories</small></h5>
    </v-card-title>
    <v-card-text v-for="(item, index) of items" :key="item" class="my-0 py-1">
      <v-btn @click="removeItem(index)" icon>
        <v-icon small color="primary">mdi-delete</v-icon>
      </v-btn>
      <!-- <SimpleTextInput :value.sync="item" /> -->

      <v-textField
        :value="item"
        @input="update($event, index)"
        outlined
        dense
        hide-details
        style="display: inline-block!important; width: 320px!important"
      />

      <v-btn @click="moveDown(index)" icon :disabled="index === items.length - 1">
        <v-icon small>mdi-arrow-down</v-icon>
      </v-btn>
      <v-btn @click="moveUp(index)" icon :disabled="index === 0">
        <v-icon small>mdi-arrow-up</v-icon>
      </v-btn>
    </v-card-text>
    <v-card-actions class="my-12">
      <v-btn @click="addItem()" outlined text color="primary">
        <v-icon small>mdi-plus</v-icon>
        Create new category
      </v-btn>
      <v-spacer />
      <v-btn dark class="primary" @click="save()" text>
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import { setCategories } from '@/helpers'

export default {
  name: 'EditTicketCategories',
  data: () => ({
    items: null,
    ready: false
  }),
  methods: {
    update (value, index) {
      this.items[index] = value
    },
    getData (data) {
      this.items = data
      this.ready = Array.isArray(this.items)
    },
    showAnswer (response) {
      const { ticketCategories } = response.data
      setCategories(ticketCategories)
    },
    removeItem (index) {
      this.items.splice(index, 1)
    },
    addItem () {
      this.items.push('')
    },
    moveDown (index) {
      this.items.splice(index + 1, 0, this.items.splice(index, 1)[0])
    },
    moveUp (index) {
      this.items.splice(index - 1, 0, this.items.splice(index, 1)[0])
    },
    save () {
      this.__updateTicketCategories(this.items, this.showAnswer)
    }
  },

  mounted () {
    this.__getTicketCategories(this.getData)
  }
}
</script>
