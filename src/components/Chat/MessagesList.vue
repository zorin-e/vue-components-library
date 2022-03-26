<template>
  <div
    :class="[$style.list, wide && $style.wide, fillHeight && $style.fillHeight]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "MessagesList",
  props: {
    wide: Boolean,
    fillHeight: Boolean
  }
};
</script>

<style module>
.list {
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
}

.wide {
  width: 100%;
  max-width: 100%;
}
</style>
