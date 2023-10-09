<template>
  <v-card flat>
    <v-card-text>
      <v-select
        :items="available"
        v-model="localValue"
        :label="label"
      />
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'Selector',
  props: ['label', 'value', 'available'],
  computed: {
    localvalue: {
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
