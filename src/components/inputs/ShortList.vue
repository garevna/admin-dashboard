<template>
  <v-card class="transparent">
    <v-toolbar height="48">
      <v-toolbar-title>
        <h5><small>{{ title }}</small></h5>
      </v-toolbar-title>
    </v-toolbar>

    <v-list
      dense
      :height="height || 360"
      width="360"
      class="transparent"
      style="overflow-y: auto; border: solid 1px #ddd"
    >
      <v-list-item
        v-for="item of list"
        :key="item.id"
        @click="$emit('update:selected', item.id)"
      >
        <small>{{ item.text }}</small>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>

export default {
  name: 'ShortList',

  props: ['title', 'list', 'selected', 'height']
}
</script>
