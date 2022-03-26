<template>
  <label
    :class="[$style.item, center && $style.center, active && $style.itemActive]"
  >
    <slot />
  </label>
</template>

<script>
export default {
  props: {
    center: Boolean,
    active: Boolean
  }
};
</script>

<style lang="scss" module>
@import "~@/styles/_variables";

.item {
  display: block;
  padding: 8px 16px;
  width: 100%;
  height: 32px;

  &:hover,
  &Active {
    background: $dropdownBorder;
  }
}

.center {
  text-align: center;
}
</style>
