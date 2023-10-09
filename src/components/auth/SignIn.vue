<template>
  <v-row justify="center" justify-md="end" class="mt-12">
    <v-card elevation="12" class="text-center mt-12 mr-md-12" max-width="600" min-width="360" height="200">
      <h5 class="my-4 text-right mr-8"><small>
        Sign In
      </small></h5>
      <v-stepper v-model="step" style="box-shadow: none;">
        <v-stepper-items>
          <v-stepper-content :step="1">
            <v-text-field
              outlined
              color="success"
              label="email"
              v-model="email"
              :rules="[rules.required, rules.email]"
            />
            <v-spacer />
            <v-btn
              dark
              color="buttons"
              v-if="!emailError"
              @click="step = 2"
            >
              Continue
            </v-btn>
            </v-stepper-content>
            <v-stepper-content :step="2">
              <v-text-field
                outlined
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'"
                color="success"
                label="password"
                @input="updatePassword($event)"
                :rules="[rules.required]"
                 @click:append="showPass = !showPass"
              />
              <v-btn
                text
                color="buttons"
                @click="reset = true"
                class="reset-password"
              >
                Reset your password
              </v-btn>
              <v-spacer />
              <v-btn
                dark
                color="buttons"
                @click="signIn"
              >
                Sign In
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      <ResetPassword :opened.sync="reset" v-if="reset" />
    </v-card>
  </v-row>
</template>

<style scoped>
</style>

<script>

import { loginHandler, passwordHandler, roleHandler, credentialsHandler } from '@/controllers/data-handlers'

import { createMapWorker } from '@/controllers'

import { patterns } from '@/configs/validation'

export default {
  name: 'SignIn',

  components: {
    ResetPassword: () => import('@/components/auth/ResetPassword.vue')
  },

  props: ['resetPassword', 'success'],

  data () {
    return {
      step: 1,
      email: '',
      showPass: false,
      emailError: false,
      valid: false,
      rules: {
        required: v => !!v || 'input is required',
        email: value => patterns.email.test(value) || 'Invalid email.'
      }
    }
  },

  computed: {
    reset: {
      get () {
        return this.resetPassword
      },
      set (val) {
        this.$emit('update:resetPassword', val)
      }
    }
  },

  watch: {
    email (val) {
      loginHandler(val)
    }
  },

  methods: {
    updatePassword (value) {
      passwordHandler(value)
    },

    authSuccess (result) {
      roleHandler(result.role)
      credentialsHandler(result.credentials)

      createMapWorker(credentialsHandler(), roleHandler())

      // localStorage.setItem('admin', roleHandler())
      // localStorage.setItem('refresh', credentialsHandler())

      const channel = new MessageChannel()

      window[Symbol.for('map.worker')].postMessage({ route: 'channel', action: 'port', port: channel.port1 }, [channel.port1])

      window[Symbol.for('vue.instance')].__worker.postMessage({ route: 'channel', action: 'port', port: channel.port2 }, [channel.port2])

      this.$router.push({ name: 'dash' }).catch(failure => console.warn('Router failure:\n', failure))
    },

    authFailure (result) {
      roleHandler(null)
      credentialsHandler(null)
      this.step = 1
    },

    async signIn () {
      this.__auth(this.authSuccess, this.authFailure)
      this.step = 1
    }
  }
}
</script>

<style scoped>
  .reset-password {
    font-size: 12px;
    margin-top: -16px;
    text-transform: none;
  }
  @media screen and (max-widt: 420px) {
    * {
      font-size: 14px;
    }
    .reset-password {
      font-size: 11px;
    }
  }
</style>
