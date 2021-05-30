<template>
  <fieldset class = "fieldset-class">
    <legend class="legend-class">
      <h5><small>{{ legend }}</small></h5>
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
  box-shadow: 0 0 3px #0007;
  padding: 32px;
  border-radius: 4px;
  margin-bottom: 48px;
}
.legend-class > h5 {
  color: #999;
  background: #fbfbfb;
  padding: 4px 8px;
  /* border: solid 1px #bbb;
  border-radius: 8px; */
}
</style>
