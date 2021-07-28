<template>
  <v-switch
    v-model="localValue"
    inset
    :hint="`${states[0]}/${states[1]}`"
    persistent-hint
    :label="`${localValue ? states[1] : states[0]}`"
  >
  </v-switch>
</template>

<script>

export default {
  name: 'SwitchValues',

  props: ['label', 'value', 'states'],

  computed: {
    localValue: {
      get () {
        return this.value === this.states[1]
      },
      set (val) {
        this.$emit('update:value', this.states[Number(val)])
      }
    }
  }
}

</script>
