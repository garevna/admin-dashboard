<template>
  <v-card v-if="ready" flat class="transparent mx-auto my-8" max-width="700">
    <table>
      <tbody>
        <tr>
          <td width="240" class="input-title"> Role </td>
          <td width="420">
            <v-select
              :items="roles"
              v-model="role"
              :menu-props="{ bottom: true, offsetY: true }"
              label="Role"
              outlined
              dense
            />
            <!-- <v-text-field
              v-model="role"
              label="Role"
              :rules="[rules.required]"
              outlined
              dense
              :error="errors.role"
            /> -->
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
              type="mobile"
            />
          </td>
        </tr>

        <!-- <tr>
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
        </tr> -->

        <!-- <tr>
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
        </tr> -->
      </tbody>
    </table>

    <v-row justify="center">
      <v-btn v-if="accessRights === 2" dark class="primary mt-5" @click="save">
        save updates
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

import { roleHandler, accessRightsHandler } from '@/controllers/data-handlers'

const { rules } = require('@/configs').default

export default {
  name: 'EditAdminDetails',

  props: ['id'],

  data: () => ({
    ready: false,
    accessRights: accessRightsHandler().access[roleHandler()].access,
    admin: null,
    rules,
    errors: {
      name: false,
      login: false,
      phoneNumber: false,
      password: false,
      passwordConfirm: false,
      role: false
    },
    role: null,
    roles: accessRightsHandler().roles,
    login: '',
    phoneNumber: '',
    password: ''
  }),

  watch: {
    id (value) {
      this.ready = false
      this.__getAdminDetails(this.id, this.callback)
    }
  },

  methods: {
    save () {
      const data = {
        id: this.id,
        role: this.role,
        login: this.login,
        phoneNumber: `+61${this.phoneNumber}`,
        password: this.password
      }

      this.__updateAdmin(data, this.updated)
    },

    callback (data) {
      const { role, login, phoneNumber, password } = data
      ;[this.role, this.login, this.password] = [role, login, password]
      this.phoneNumber = phoneNumber.slice(3)
      this.ready = true
    },

    updated (data) {
      //
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
