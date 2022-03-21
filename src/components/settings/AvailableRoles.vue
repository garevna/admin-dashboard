<template>
  <v-card flat class="transparent mx-auto mb-12" max-width="800">
    <v-expansion-panels>
      <v-expansion-panel v-for="(roleRights, role) in access" :key="role">
        <v-expansion-panel-header>
          {{ role }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <table class="mx-auto mb-8" width="600">
            <tbody>
              <tr v-for="section of dashboard" :key="`${role}-${section}`">
                <td>
                  <h5>
                    <small><small>{{ section }}</small></small>
                  </h5>
                </td>
                <td>
                  <v-radio-group
                    v-model="roleRights[section]"
                    row
                    small
                    hide-details
                  >
                    <v-radio label="Access denied" :value="0" />
                    <v-radio v-if="section !== 'polygons'" label="Read only" :value="1" />
                    <v-radio label="Read and write" :value="2" />
                  </v-radio-group>
                </td>
              </tr>
            </tbody>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-row justify="center">
      <v-btn v-if="rights === 2" dark class="primary my-8" @click="updateAccessSettings">
        save/update
      </v-btn>
    </v-row>

  </v-card>
</template>

<script>

import { roleHandler, accessRightsHandler } from '@/controllers/data-handlers'

export default {
  name: 'AvailableRoles',

  data: () => ({
    rights: accessRightsHandler().access[roleHandler()].access,
    access: accessRightsHandler().access,
    dashboard: accessRightsHandler().dashboard
  }),

  methods: {
    callback (data) {
      //
    },

    updateAccessSettings () {
      accessRightsHandler(Object.assign(accessRightsHandler(), { access: this.access }))
      this.__updateAccessSettings(accessRightsHandler(), this.callback)
    }
  }
}
</script>

<style>
tr {
  vertical-align: baseline;
}
</style>
