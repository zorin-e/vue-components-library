<template>
  <div :class="[$style.block, $style['block--' + type], wide && $style.wide]">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Block",
  props: {
    type: {
      type: String,
      default: "primary"
    },
    wide: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" module>
@import "@/styles/_variables";

.block {
  border-radius: $radius;
  padding: $indent;

  &--primary {
    background: $white;
  }
  &--transparent {
    background: transparent;
  }
}

.wide {
  width: 100%;
}
</style>
