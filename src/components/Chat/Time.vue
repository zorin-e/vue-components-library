<template>
  <div :class="$style.time">
    {{ time }}
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" module>
@import "~@/styles/_variables";

.time {
  color: $grey30;
  font-size: 9px;
  position: absolute;
  bottom: 5px;
  right: 10px;
}
</style>
