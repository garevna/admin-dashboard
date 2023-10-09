<template>
  <v-snackbar v-model="opened" :timeout="timeout" color="primary" top>
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn
        color="#fff"
        class="close-icon-snackbar"
        icon
        v-bind="attrs"
        @click="opened = false"
      >
        <v-icon large>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>

export default {
  name: 'MessageTooltip',

  props: ['show', 'message'],

  computed: {
    opened: {
      get () {
        return this.show
      },
      set (val) {
        this.$emit('update:show', val)
      }
    }
  }

}
</script>
