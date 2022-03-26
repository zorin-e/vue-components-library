<template>
  <div class="row align--v-center">
    <div v-for="name in colsKeys" :key="name" :class="'col-' + cols[name]">
      <slot :name="name" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cols: {
      type: Object,
      default: () => ({
        left: 4,
        right: 8
      })
    }
  },
  computed: {
    colsKeys() {
      return Object.keys(this.cols);
    }
  }
};
</script>
