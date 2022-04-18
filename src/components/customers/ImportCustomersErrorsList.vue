<template>
  <div>
    <h5 class="my-4">
      <v-icon small :color="color">{{ icon }}</v-icon>
      <small :style="{ color }">{{ title }}</small>
    </h5>
    <div v-for="(address, index) of filterAddressList()" :key="index">
      <span :style="{ color, marginRight: '16px' }">{{ address }}</span>
      <li v-for="(item, num) of filterErrors(address)" :key="num">
        {{ item }}
      </li>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ImportCustomersErrorsList',

  props: ['title', 'type', 'items'],

  data: () => ({
    //
  }),

  computed: {
    color () {
      return this.type === 'fatal' ? '#f00'
        : this.type === 'error' ? '#900'
          : '#fa0'
    },

    icon () {
      return this.type === 'fatal' ? 'mdi-alert'
        : this.type === 'error' ? 'mdi-alert-outline'
          : 'mdi-message-alert'
    }
  },

  methods: {
    filterAddressList () {
      return Array.from(new Set(this.items.map(item => item.address)))
    },

    filterErrors (address) {
      return this.items
        .filter(item => item.address === address)
        .map(item => item.error || item.warning)
    }
  }
}
</script>
