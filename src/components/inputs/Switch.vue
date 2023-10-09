<template>
  <v-switch
    v-model="switcher"
    inset
    :hint="hint"
    persistent-hint
    :label="label"
  >
  </v-switch>
</template>

<script>

export default {
  name: 'Switch',
  props: ['label', 'value', 'states'],
  data: () => ({
    switcher: false
  }),
  computed: {
    hint () {
      return `${this.states[0]}/${this.states[1]}`
    },
    localValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('update:value', val)
      }
    }
  }
}

</script>
