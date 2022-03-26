<template>
  <div @click.stop="$emit('unselectAll')" :class="$style.counter">
    <div :class="$style.amount">{{ amount }}</div>
    <div :class="$style.close"><counter-close /></div>
  </div>
</template>

<script>
import CounterClose from "./counter-close.svg";

export default {
  props: {
    amount: {
      type: Number,
      default: 0
    }
  },
  components: {
    CounterClose
  }
};
</script>

<style lang="scss" module>
@import "~@/styles/_variables";
@import "~@/styles/_mixins";

.counter {
  height: 24px;
  min-width: 51px;
  background: $errorText;
  border-radius: 4px;
  padding: 5px 10px;
}

.close {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 9px;
  padding: 1px;
  cursor: pointer;
  @include size(14px);
}

.amount {
  margin-right: 20px;
  color: $white;
}
</style>
