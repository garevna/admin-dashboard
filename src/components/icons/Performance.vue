<template>
  <v-card flat class="transparent" width="40">
    <v-img v-if="active" src="@/assets/images/speedometer-light.png" height="48" contain />
    <v-img v-else src="@/assets/images/speedometer.png" height="48" contain />
  </v-card>
</template>

<script>
export default {
  name: 'Performance',
  props: ['active']
}
</script>
