<template>
  <v-textField
    v-model="input"
    outlined
    dense
    hide-details
    style="display: inline-block!important; max-width: 240px!important"
  />
</template>

<script>

export default {
  name: 'SimpleTextInput',
  props: ['value'],
  computed: {
    input: {
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
