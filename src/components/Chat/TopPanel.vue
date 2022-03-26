<template>
  <div :class="$style.panel"><slot /></div>
</template>

<style lang="scss" module>
@import "~@/styles/_variables";

.panel {
  border-bottom: solid 1px $divider;
  padding: 16px 24px;
  font-weight: bold;
  font-size: 15px;
}
</style>
