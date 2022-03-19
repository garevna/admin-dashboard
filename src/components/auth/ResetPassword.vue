<template>
  <v-dialog v-model="dialog" max-width="480px" style="height: 160px" class="pa-4">
    <v-stepper v-model="step">
      <v-stepper-header height="48" class="transparent py-2 px-4" style="box-shadow: none">
        <h5><small>Reset password</small></h5>
        <v-spacer />
        <v-btn icon large @click="$emit('update:opened', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row align="start" justify="center">
            <v-col cols="8">
              <v-text-field
                v-model="code"
                outlined
                label="Enter the code from sms"
              />
            </v-col>
            <v-col cols="2">
              <v-btn text color="primary" class="mt-2" @click="sendCode">
                <v-icon large> mdi-send </v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-btn v-if="passwordDialog" color="primary" @click="step = 2">
            Continue
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-row align="start" justify="center">
            <v-col cols="8">
              <v-text-field
                outlined
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'"
                color="success"
                label="New password"
                v-model="password"
                :rules="rules"
                 @click:append="showPass = !showPass"
              />
            </v-col>

            <v-col cols="2">
              <v-btn text color="primary" class="mt-2" @click="sendPassword">
                <v-icon large>mdi-send</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-dialog>
</template>

<script>

import { /* loginHandler, */ codeHandler, passwordHandler } from '@/controllers/data-handlers'

const { rules } = require('@/configs').default

export default {
  name: 'ResetPassword',

  props: ['opened'],

  data: () => ({
    step: 1,
    codeDialog: false,
    passwordDialog: false,
    code: '',
    password: '',
    showPass: false,
    rules: [rules.required, rules.password]
  }),

  computed: {
    dialog: {
      get () { return this.opened },
      set (val) { this.$emit('update:opened', val) }
    }
  },

  methods: {
    sendCode () {
      codeHandler(this.code)
      this.__worker.addEventListener('message', this.codeCallback)
      this.$root.$sendMessageToWorker({ route: 'admin', action: 'code', code: codeHandler() })
      this.step = 2
    },

    sendPassword () {
      passwordHandler(this.password)
      this.__worker.addEventListener('message', this.changeCallback)
      this.$root.$sendMessageToWorker({
        route: 'admin',
        action: 'change',
        password: passwordHandler()
      })
      this.$emit('update:opened', false)
    },

    resetCallback (event) {
      this.codeDialog = true
    },

    resetFailure (event) {
      this.codeDialog = false
      this.dialog = false
    },

    codeCallback (event) {
      if (event.data.action !== 'code' || event.data.status === 300) return
      if (event.data.status !== 200) return this.$emit('update:opened', false)
      this.__worker.removeEventListener('message', this.codeCallback)
      if (event.data.status === 200) {
        this.passwordDialog = true
      }
    },

    changeCallback (event) {
      this.__worker.removeEventListener('message', this.changeCallback)
      this.$emit('update:opened', false)
    }
  },

  mounted () {
    this.__resetPassword(this.resetCallback, this.resetFailure)
  }
}
</script>
