<template>
  <v-card
    flat
    class="transparent mx-auto text-center"
    width="320"
    style="display: inline-block !important"
  >
    <h5><small>{{ title }}</small></h5>
      <v-time-picker
        format="ampm"
        v-model="localTime"
        :min="minValue"
        :max="maxValue"
        width="280"
        color="#900"
      ></v-time-picker>
  </v-card>
</template>

<script>

export default {
  name: 'TimePicker',

  props: ['title', 'time', 'min', 'max'],

  computed: {
    localTime: {
      get () {
        return this.time
      },
      set (value) {
        this.$emit('update:time', value)
      }
    },
    minValue () {
      return this.min || '00:00'
    },
    maxValue () {
      return this.max || '24:00'
    }
  }
}
</script>

<style>

.theme--light.v-card {
  background-color: #FBFBFB;
}

.v-picker__body > div {
  background: #fbfbfb !important;
}

.v-picker__title {
  height: 48px;
  width: 120px;
  padding: 8px;
  margin: 0 auto;
  background: transparent!important;
}

.v-time-picker-title {
  justify-content: center;
  color: #900;
}

.theme--light.v-time-picker-clock {
  background: transparent;
  box-shadow: 0 0 12px #0007;
}

.v-time-picker-title__time .v-picker__title__btn, .v-time-picker-title__time span {
  font-size: 16px!important;
  height: 32px!important;
}

.v-picker__title__btn {
  color: #777;
}

.v-picker__title__btn--active {
  color: #900;
  font-weight: bold;
}
</style>
