<template>
  <v-card v-if="ready" flat class="transparent mx-auto" max-width="700">
    <table>
      <tbody>
        <tr>
          <td width="240" class="input-title"> Company name </td>
          <td width="420">
            <v-text-field
              v-model="companyName"
              label="Company name"
              :rules="[rules.required]"
              outlined
              dense
              :error="errors.companyName"
            />
          </td>
        </tr>

        <tr>
          <td width="160" class="input-title"> Partner's unique code (XX) </td>
          <td>
            <v-text-field
              v-model="uniqueCode"
              label="Unique code"
              :rules="[rules.required, rules.counter, rules.test, rules.letters]"
              outlined
              dense
              :error="errors.uniqueCode"
            />
          </td>
        </tr>

        <tr>
          <td width="160" class="input-title"> Login </td>
          <td>
            <v-text-field
              v-model="login"
              label="Login"
              :rules="[rules.required, rules.email]"
              outlined
              dense
              :error="errors.login"
              type="email"
            />
          </td>
        </tr>

        <tr>
          <td width="160" class="input-title"> Password reset phone number </td>
          <td>
            <v-text-field
              v-model="phoneNumber"
              label="Phone"
              :rules="[rules.required, rules.mobile]"
              outlined
              dense
              prefix="+61"
              :error="errors.phoneNumber"
              type="email"
            />
          </td>
        </tr>

        <tr>
          <td width="160" class="input-title"> Password </td>
          <td>
            <v-text-field
              v-model="password"
              label="Password"
              outlined
              dense
              :hint="passwordHint"
              :error="errors.password"
              :append-icon="appendIcon()"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            />
          </td>
        </tr>

        <tr>
          <td width="160" class="input-title"> Password (once more)  </td>
          <td>
            <v-text-field
              v-model="passwordConfirm"
              :disabled="errors.password"
              label="Password"
              outlined
              dense
              :hint="confirmPasswordHint"
              :error="errors.passwordConfirm"
              :append-icon="appendIcon()"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <v-row justify="center">
      <v-btn v-if="validData" text outlined class="mt-12" @click="createPartner">
        CREATE PARTNER
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

const { partnerSchema, rules } = require('@/configs').default

let uniqueCodeList = []

export default {
  name: 'CreateNewPartner',

  data: () => ({
    ready: false,
    partner: {},
    rules: Object.assign(rules, { test: value => !uniqueCodeList.includes(value) || 'Allready in use' }),
    errors: {
      name: false,
      login: false,
      phoneNumber: false,
      password: false,
      passwordConfirm: false,
      uniqueCode: false
    },
    password: '',
    passwordConfirm: '',
    showPassword: false,
    passwordHint: '',
    confirmPasswordHint: '',
    passwordDefaultHint: '8-15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
    confirmPasswordDefaultHint: 'Repeat the password'
  }),

  computed: {
    companyName: {
      get () {
        return this.partner.company.name
      },
      set (val) {
        this.partner.company.name = val
      }
    },
    uniqueCode: {
      get () {
        return this.partner.uniqueCode
      },
      set (val) {
        this.partner.uniqueCode = val
      }
    },
    login: {
      get () {
        return this.partner.userInfo.login
      },
      set (val) {
        this.partner.userInfo.login = val
      }
    },
    phoneNumber: {
      get () {
        return this.partner.userInfo.phoneNumber
      },
      set (val) {
        this.partner.userInfo.phoneNumber = val
      }
    },
    validData () {
      return Object.keys(this.errors).filter(key => !this.errors[key])
    }
  },

  watch: {
    password (value) {
      const test = this.rules.password(value)
      const valid = typeof test !== 'string' && test
      this.errors.password = value && !valid
      this.passwordHint = !value ? this.passwordDefaultHint : !valid ? test : 'OK'
    },
    passwordConfirm (value) {
      this.errors.passwordConfirm = value !== this.password
      this.confirmPasswordHint = !value ? this.confirmPasswordDefaultHint : !this.errors.passwordConfirm ? 'OK' : 'Not match'
    }
  },

  methods: {
    getUniqueCodeList (data) {
      uniqueCodeList = data
      this.ready = true
    },

    appendIcon () {
      return this.showPassword ? 'mdi-eye' : 'mdi-eye-off'
    },
    type () {
      return this.showPassword ? 'text' : 'password'
    },

    createPartner () {
      const data = Object.assign(this.partner, {
        login: this.login,
        phoneNumber: this.phoneNumber,
        password: this.password,
        approved: true
      })

      this.__createPartner(data, this.callback)
    },

    callback (data) {
      this.$router.push({ name: 'rsp-list' })
    }
  },

  created () {
    this.__getUniqueCodeList(this.getUniqueCodeList)
    this.partner = this.__clone(partnerSchema)
  }
}
</script>

<style>

input:-webkit-autofill {
  -webkit-background-clip: text;
}

.input-title {
  text-align: right;
  vertical-align: middle;
  padding: 0 8px 16px 0;
}
</style>
