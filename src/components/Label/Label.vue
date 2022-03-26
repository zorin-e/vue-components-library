<template>
  <div :class="[$style.label, $style[`label--${color}`]]">
    {{ title }}
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "primary",
      validator: function(value) {
        return ["primary", "warning", "error"].includes(value);
      }
    }
  }
};
</script>
<style lang="scss" module>
@import "~@/styles/_variables";

.label {
  display: inline-flex;
  padding: 1px 4px;
  border-radius: 4px;
  align-self: center;
  margin: 0px 10px;
  text-transform: uppercase;
  font-size: 10px;
  line-height: 12px;
  font-weight: 600;

  &--primary {
    background: $green80;
    color: $green40;
  }
  &--warning {
    background: $warning;
    color: $warningText;
  }
  &--error {
    background: $warning;
    color: $errorText;
  }
}
</style>
