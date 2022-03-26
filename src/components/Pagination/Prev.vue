<template>
  <div :class="[$style.pagination, $style.prev]" @click="$emit('click')">
    <prev />
  </div>
</template>

<script>
import Prev from "./assets/prev.svg";

export default {
  components: {
    Prev
  }
};
</script>

<style module lang="scss">
@import "./assets/styles.scss";

.prev {
  &:hover {
    transform: translateX(-2px);
  }
}
</style>
