<template>
  <div>
    <p><input v-model="outer_var" /></p>
    <p>Inner-Value: {{ outer_var }}</p>
  </div>
</template>

<script>
  export default {
    // relating to the attribute define in outer <router-view> tag.
    props: ['outer_var'],
    data: function () {
      return {};
    }
  }
</script>
