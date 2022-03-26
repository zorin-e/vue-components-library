<template>
  <h3 :class="[$style.title, background && $style.background]" :style="styles">
    <slot />
  </h3>
</template>

<script>
export default {
  name: "Title",
  props: {
    styles: {
      type: Object,
      default: () => ({})
    },
    background: Boolean
  }
};
</script>

<style lang="scss" module>
.title {
  font-size: 20px;
  font-weight: 500;
  margin: 0;
}

.background {
  background: #eaeaea;
  padding: 10px;
}
</style>
