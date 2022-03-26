<template>
  <div :class="[$style.pagination, $style.next]" @click="$emit('click')">
    <next />
  </div>
</template>

<script>
import Next from "./assets/next.svg";

export default {
  components: {
    Next
  }
};
</script>

<style module lang="scss">
@import "./assets/styles.scss";

.next {
  &:hover {
    transform: translateX(2px);
  }
}
</style>
