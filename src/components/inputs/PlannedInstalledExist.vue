<template>
  <v-card flat class="transparent">
    <table>
      <thead>
        <tr>
          <th> Planned </th>
          <th> Installed </th>
          <th v-if="showExist"> Exist </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <v-checkbox v-model="localPlanned" />
          </td>
          <td>
            <v-checkbox v-model="localInstalled" />
          </td>
          <td v-if="showExist">
            <v-checkbox v-model="localExist" />
          </td>
        </tr>
      </tbody>
    </table>
  </v-card>
</template>

<script>
export default {
  name: 'PlannedInstalledExist',

  props: ['planned', 'installed', 'exist', 'showExist'],

  computed: {
    localPlanned: {
      get () {
        return this.planned
      },
      set (val) {
        this.$emit('update:planned', val)
      }
    },
    localInstalled: {
      get () {
        return this.installed
      },
      set (val) {
        this.$emit('update:installed', val)
      }
    },
    localExist: {
      get () {
        return this.exist
      },
      set (val) {
        this.$emit('update:exist', val)
      }
    }
  }
}
</script>
