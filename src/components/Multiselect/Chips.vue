<template>
  <div :class="$style.chips" @click.stop="$emit('unselectItem', id)">
    {{ text }}
    <div :class="$style.close">
      <chips-close />
    </div>
  </div>
</template>

<script>
import ChipsClose from "./chips-close.svg";

export default {
  props: {
    text: {
      type: String,
      required: true
    },
    id: {
      type: [Number, String],
      required: true
    }
  },
  components: {
    ChipsClose
  }
};
</script>

<style lang="scss" module>
@import "~@/styles/_variables";
@import "~@/styles/_mixins";

.chips {
  padding: 5px 15px 5px 12px;
  background: $chipsBg;
  border-radius: 4px;
  color: $notifications;
  font-size: 16px;
  height: 32px;
  @include flex(space-between, center);
}

.close {
  margin-left: 10px;
  cursor: pointer;
}
</style>
