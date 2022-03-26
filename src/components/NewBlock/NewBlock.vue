<template>
  <div :class="[$style.block, maxHeight && $style.maxHeight]">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    maxHeight: Boolean
  }
};
</script>

<style module>
.block {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 0px 1px rgba(0, 0, 0, 0.4);
}

.maxHeight {
  height: 100%;
}
</style>
