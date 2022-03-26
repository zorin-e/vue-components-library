<template>
  <div :class="$style.error">
    <div><alert /></div>
    <slot />
  </div>
</template>

<script>
import Alert from "./alert.svg";

export default {
  name: "ErrorText",
  components: {
    Alert
  }
};
</script>

<style lang="scss" module>
@import "~@/styles/_mixins";

.error {
  color: red;
  @include flex(null, center);
}
</style>
