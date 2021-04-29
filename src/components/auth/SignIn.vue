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

import { loginHandler, passwordHandler, roleHandler } from '@/controllers/data-handlers'
import { patterns } from '@/configs'

export default {
  name: 'SignIn',
  components: {
    ResetPassword: () => import('@/components/auth/ResetPassword.vue')
  },
  props: ['reset', 'success'],
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
  watch: {
    email (val) {
      loginHandler(val)
    }
  },
  methods: {
    updatePassword (value) {
      passwordHandler(value)
    },
    showResult (event) {
      console.log(event)
      roleHandler(event.data.role)
      this.$router.push({ name: 'dash' })
    },
    async signIn () {
      this.$root.$on('auth-success', this.showResult)
      this.__auth(this.email, passwordHandler())
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
      /* margin-top: -16px;
      text-transform: none; */
    }
  }
</style>
