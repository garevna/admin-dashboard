<template>
  <v-card flat class="transparent mx-auto" max-width="700">
    <table>
      <tbody>
        <tr>
          <td width="240" class="input-title"> Role </td>
          <td width="420">
            <v-text-field
              v-model="admin.role"
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
              v-model="admin.rights"
              label="Rights"
              :rules="[rules.required]"
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
      <v-btn v-if="validData" text outlined class="mt-12" @click="createAdmin">
        CREATE ADMIN
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

const { rules } = require('@/configs').default

export default {
  name: 'CreateNewAdmin',

  data: () => ({
    ready: false,
    admin: {
      role: 'admin',
      rights: 2,
      userInfo: {
        login: '',
        password: '',
        phoneNumber: ''
      }
    },
    rules,
    errors: {
      role: false,
      rights: false,
      login: false,
      phoneNumber: false,
      password: false,
      passwordConfirm: false
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

    createAdmin () {
      const data = Object.assign(this.admin, {
        login: this.login,
        phoneNumber: `+61${this.phoneNumber}`,
        password: this.password
      })

      this.__createAdmin(data, this.callback)
    },

    callback (data) {
      this.$router.push({ name: 'admins-list' })
    }
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
