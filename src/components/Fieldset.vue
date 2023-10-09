<template>
  <fieldset class = "fieldset-class">
    <legend class="legend-class">
      <h5>{{ legend }}</h5>
    </legend>
    <slot>...</slot>
  </fieldset>
</template>

<script>

export default {
  name: 'Fieldset',

  props: ['legend']
}
</script>

<style>
.fieldset-class {
  border: solid 1px #aaa;
  box-shadow: 0 0 1px #0005;
  padding: 32px;
  border-radius: 4px;
  margin-bottom: 48px;
}
.legend-class > h5 {
  color: #999;
  font-size: 14px;
  background: #fbfbfb;
  padding: 4px 8px;
}
</style>
