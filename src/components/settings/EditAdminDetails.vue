<template>
  <v-card v-if="ready" flat class="transparent mx-auto" max-width="700">
    <table>
      <tbody>
        <tr>
          <td width="240" class="input-title"> Role </td>
          <td width="420">
            <v-text-field
              v-model="role"
              label="Role"
              :rules="[rules.required]"
              outlined
              dense
              :error="errors.role"
            />
          </td>
        </tr>

        <tr>
          <td width="160" class="input-title"> Rights </td>
          <td>
            <v-text-field
              v-model="rights"
              label="Rights"
              :rules="[rules.required, rules.counter, rules.test, rules.letters]"
              outlined
              dense
              :error="errors.rights"
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
      <v-btn v-if="validData" text outlined class="mt-12" @click="save">
        save updates
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

const { rules } = require('@/configs').default

export default {
  name: 'EditAdminDetails',

  props: ['id'],

  data: () => ({
    ready: false,
    rules,
    errors: {
      name: false,
      login: false,
      phoneNumber: false,
      password: false,
      passwordConfirm: false,
      role: false
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
    admin: {
      get () {
        return this.details
      },
      set (val) {
        this.$emit('update:details', this.admin)
      }
    },
    role: {
      get () {
        return this.admin.role
      },
      set (val) {
        this.admin.role = val
      }
    },
    uniqueCode: {
      get () {
        return this.admin.rights
      },
      set (val) {
        this.admin.rights = val
      }
    },
    login: {
      get () {
        return this.admin.userInfo.login
      },
      set (val) {
        this.admin.userInfo.login = val
      }
    },
    phoneNumber: {
      get () {
        return this.admin.userInfo.phoneNumber
      },
      set (val) {
        this.admin.userInfo.phoneNumber = val
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
    appendIcon () {
      return this.showPassword ? 'mdi-eye' : 'mdi-eye-off'
    },

    type () {
      return this.showPassword ? 'text' : 'password'
    },

    save () {
      const data = Object.assign(this.admin, {
        login: this.login,
        phoneNumber: `+61${this.phoneNumber}`,
        password: this.password
      })

      this.__updateAdmin(data, this.callback)
    },

    callback (data) {
      console.log(data)
    }
  },

  beforeMount () {
    this.__getAdminDetails(this.id, this.callback)
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
