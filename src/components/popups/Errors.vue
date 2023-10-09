<template>
  <v-card class="transparent" v-if="opened" transition="fade">
    <div class="errors-panel-title pa-2">
      <v-btn icon @click="resetErrors" class="mr-5">
        <v-icon large color="#fffd"> $close </v-icon>
      </v-btn>
      {{ errorsGroupTitle || 'Errors' }}
    </div>
    <v-row align="center">
        <v-card class="errors-panel">
          <p
            v-for="(error, index) of errorList"
            :key="index"
            class="text-left"
          >
            <v-icon small color="#d00"> $error </v-icon>{{ error }}
          </p>
        </v-card>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'Errors',

  data: () => ({
    opened: false,
    errorList: [],
    errorsGroupTitle: ''
  }),

  methods: {
    resetErrors () {
      this.opened = false
      this.errorList = []
      this.errorsGroupTitle = ''
    },
    open (data) {
      this.opened = true
      this.errorList = data.errorList
      this.errorsGroupTitle = data.title
    }
  },

  beforeDestroy () {
    this.$root.$off('open-errors-panel', this.open)
    this.$root.$off('close-errors-panel', this.resetErrors)
  },

  mounted () {
    this.$root.$on('open-errors-panel', this.open)
    this.$root.$on('close-errors-panel', this.resetErrors)
  }
}
</script>

<style>
.errors-panel-title {
  position: fixed;
  z-index: 49;
  border-radius: 4px;
  right: 0;
  bottom: 400px;
  width: 30%;
  height: 48px;
  background: #900;
  color: #fffd;
}
.errors-panel {
  position: fixed;
  z-index: 50;
  right: 0;
  bottom: 80px;
  width: 30%;
  min-height: 320px;
  max-height: 320px;
  padding: 16px;
  background: #fbfbfb;
  box-shadow: -4px 0 8px #0005 !important;
  overflow: auto;
}

.errors-panel p {
  font-size: 13px !important;
}
</style>
