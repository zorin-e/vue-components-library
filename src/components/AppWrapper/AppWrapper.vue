<template>
  <div :class="$style.app">
    <div :class="$style.app__wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "AppWrapper"
};
</script>

<style lang="scss" module>
.app {
  display: flex;

  &__wrapper {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: 100%;
    position: relative;
  }
}
</style>
