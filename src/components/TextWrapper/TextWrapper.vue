<template>
  <div :class="[center && $style.center]">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    center: Boolean
  }
};
</script>

<style module>
.center {
  text-align: center;
}
</style>
