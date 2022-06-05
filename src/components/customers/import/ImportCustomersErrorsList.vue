<template>
  <v-expansion-panels flat>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <v-icon small :color="color">{{ icon }}</v-icon>
        <b :style="{ color }">{{ title }} ({{ filterAddressList().length }})</b>
      </v-expansion-panel-header>
      <v-expansion-panel-content style="padding-left: 48px !important">
        <v-expansion-panels flat v-for="(address, index) of filterAddressList()" :key="index">
          <v-expansion-panel>
            <v-expansion-panel-header style="padding: 4px 8px !important">
              <small :style="{ /* color, */ color: '#555', marginRight: '16px' }">{{ address }}</small>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <li v-for="(item, num) of filterErrors(address)" :key="num">
                <span :style="{ color: '#777', marginRight: '16px' }">{{ item }}</span>
              </li>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  <!-- <div>
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
  </div> -->
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
      return this.type === 'fatal' ? '#d00'
        : this.type === 'error' ? '#900'
          : '#f50'
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
