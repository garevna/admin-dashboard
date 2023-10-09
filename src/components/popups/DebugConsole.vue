<template>
  <v-card class="transparent" v-if="opened" transition="fade">
    <div class="debugger-console-title pa-2">
      <v-btn icon @click="resetErrors" class="mr-5">
        <v-icon color="#fffd"> $close </v-icon>
      </v-btn>
      {{ new Date().toISOString().slice(0, 10) }}
      <!-- <span v-html="groupTitle" /> -->
    </div>

    <div class="debugger-console-content" id="debugger-console-content">
      <div v-for="(key, index) of keys" :key="index">
        <v-card flat class="debugger-console-record">
          <h5>{{ titles[index] }}</h5>
          <v-card-text class="pl-5">
            <p v-for="(message, num) of messages[key]" :key="`${key}.${num}`">
              {{ message }}
            </p>
            <!-- <p
              v-for="(warning, index) of warnList"
              :key="index"
              class="text-left"
            >
              <v-icon small color="#fa0"> $error </v-icon>{{ warning }}
            </p> -->
          </v-card-text>
        </v-card>
      </div>
    </div>
  </v-card>
</template>

<script>

const { debuggerConsole } = require('@/configs').default

export default {
  name: 'DebugConsole',

  data: () => ({
    console: null,
    opened: false,
    lastKey: '',
    lastTitle: '',
    keys: [],
    titles: [],
    messages: {},
    warnList: [],
    groupTitle: ''
  }),

  methods: {
    resetErrors () {
      this.opened = false
      this.errorList = []
      this.lastTitle = ''
      // this.groupTitle = ''
    },

    clearLog (key) {
      localStorage.removeItem(key)
    },

    clearAll () {
      localStorage.clear()
    },

    getGroupTitle () {
      // return `<small>Debugger</small> <b>${new Date().toISOString().slice(0, 10)}</b> <small>log</small> <b>${new Date().toLocaleTimeString()}</b>`
    },

    selectKey () {
      this.groupTitle = this.getGroupTitle()
      this.warnList = debuggerConsole.map(item => item.title)
    },

    showLastRecords () {
      if (!this.lastKey) return
      const item = localStorage.getItem(this.lastKey)
      if (!item) return
      const { title, records } = JSON.parse(item)
      this.groupTitle = title || this.getGroupTitle()
      this.warnList = records
      this.opened = true
    },

    showRecordsByKey (key) {
      if (!key) return
      this.lastKey = key
      this.showLastRecords()
    },

    open (data) {
      if (!data) this.init()

      this.opened = true
    },

    getTime () {
      const date = new Date()
      const [hours, minutes] = [
        date.getHours().toString().padStart(2, '0'),
        (date.getMinutes() + (date.getSeconds() > 40)).toString().padStart(2, '0')
      ]
      return `${hours}:${minutes}`
    },

    getKeys () {
      const tmp = localStorage.getItem('debugger-console-keys')
      return tmp ? JSON.parse(tmp).filter(key => localStorage.getItem(key)) : []
    },

    updateKeys (keys) {
      localStorage.setItem('debugger-console-keys', JSON.stringify(keys))
    },

    addKey (key) {
      const keys = this.getKeys()
      if (!keys.includes(key)) {
        keys.push(key)
        this.updateKeys(keys)
      }
      return keys
    },

    init () {
      this.keys = this.getKeys()
      const records = this.keys.map(key => JSON.parse(localStorage.getItem(key)))

      this.titles = records.map(record => record.title)
      this.messages = {}
      this.keys.forEach((key, index) => {
        this.messages[key] = records[index].records
      })
    },

    updateRecords (data) {
      const { key, message, title } = data

      const lastKey = `${this.getTime()} ${key}`
      const lastTitle = `${this.getTime()} ${title}`

      this.keys = this.addKey(lastKey)

      this.titles.includes(lastTitle) || this.titles.push(lastTitle)

      this.messages[lastKey]
        ? this.messages[lastKey].push(message)
        : Object.assign(this.messages, { [lastKey]: [message] })

      const item = localStorage.getItem(lastKey)
      const records = item ? JSON.parse(item).records : []
      records.push(message)
      localStorage.setItem(lastKey, JSON.stringify({ title: lastTitle, records }))
      this.opened = true

      this.$nextTick(() => {
        const console = document.getElementById('debugger-console-content')
        console.scroll({ top: console.scrollHeight, behavior: 'smooth' })
      })
    }
  },

  beforeDestroy () {
    this.$root.$off('open-debugger-console', this.open)
    this.$root.$off('update-debugger-console-data', this.updateRecords)
    this.$root.$off('close-debugger-console', this.resetErrors)
    this.$root.$off('clear-debugger-console', this.clearLog)
  },

  mounted () {
    localStorage.clear()

    this.init()

    this.$root.$on('open-debugger-console', this.open)
    this.$root.$on('update-debugger-console-data', this.updateRecords)
    this.$root.$on('close-debugger-console', this.resetErrors)
    this.$root.$on('clear-debugger-console', this.clearLog)
  }
}
</script>

<style>
.debugger-console-title {
  position: fixed;
  z-index: 49;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  left: 0;
  bottom: 448px;
  width: 30%;
  height: 48px;
  background: #555;
  color: #eee;
  box-shadow: 4px -4px 8px #0005 !important;
}
.debugger-console-content {
  position: fixed;
  z-index: 50;
  left: 0;
  bottom: 28px;
  width: 30%;
  min-height: 420px;
  max-height: 420px;
  padding: 16px;
  background: #fbfbfb;
  box-shadow: 4px 0 8px #0005 !important;
  overflow-y: auto;
}

.debugger-console-content p {
  font-size: 12px;
  color: #555;
}

.debugger-console-content h5 {
  font-size: 14px;
  font-weight: bold;
  color: #900;
}
</style>
