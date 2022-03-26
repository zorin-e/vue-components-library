<template>
  <div
    :class="[$style.item, isActive && $style.itemActive]"
    @click="$emit('click')"
  >
    {{ title }}
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: [String, Number],
      required: true
    },
    isActive: Boolean
  }
};
</script>
<style lang="scss" module>
@import "~@/styles/_variables";
.item {
  padding: 0 18px;
  line-height: 48px;
  color: $title;
  cursor: pointer;

  &:hover,
  &Active {
    background: $green80;
    border-radius: 4px;
  }
}
</style>
