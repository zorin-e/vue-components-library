<template>
  <div :class="$style.counter">
    {{ amount }}
  </div>
</template>

<script>
export default {
  props: {
    amount: {
      type: [String, Number],
      default: ""
    }
  }
};
</script>

<style lang="scss" module>
@import "~@/styles/_mixins";
@import "~@/styles/_variables";

.counter {
  background: $notifications;
  font-size: $fieldFontSizeSm;
  border-radius: 15px;
  color: $white;
  padding: 3px 5px;
  min-width: 20px;
  height: 20px;
  display: inline-block;
  font-weight: normal;
  text-align: center;
}
</style>
