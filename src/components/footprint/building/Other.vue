<template>
  <v-card flat class="transparent mx-auto" max-width="960">
    <v-toolbar flat class="transparent">
      <v-toolbar-title>
        <h5><small> Other </small></h5>
      </v-toolbar-title>
    </v-toolbar>
  </v-card>
</template>

<script>

import { roleHandler, accessRightsHandler } from '@/controllers/data-handlers'

export default {
  name: 'OtherBuildingDetails',
  data: () => ({
    accessRights: accessRightsHandler().access[roleHandler()].buildings
  }),
  methods: {
    //
  }
}
</script>
