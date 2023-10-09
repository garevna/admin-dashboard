<template>
  <v-card flat class="transparent mx-auto text-center" max-width="480">
    <v-card-title class="my-8">
      <h5>
        <small> {{ title }} </small>
      </h5>
    </v-card-title>
    <v-card-text v-for="(item, index) of items" :key="item" class="my-0 py-1">
      <v-btn @click="removeItem(index)" icon>
        <v-icon small color="primary">mdi-delete</v-icon>
      </v-btn>

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
    <v-card-actions class="text-center my-12">
      <v-btn @click="addItem()" outlined text color="primary">
        <v-icon small>mdi-plus</v-icon>
        Create new
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: 'ListEditor',

  props: ['title', 'list'],

  data: () => ({
    ready: false
  }),

  computed: {
    items: {
      get () {
        return this.list
      },
      set (data) {
        this.$emit('update:list', data)
      }
    }
  },

  methods: {
    update (value, index) {
      this.items[index] = value
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
    }
  }
}
</script>
