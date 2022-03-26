<template>
  <div :class="$style.date">
    <slot></slot>
  </div>
</template>

<style lang="scss" module>
@import "~@/styles/_variables";

.date {
  display: inline-block;
  text-align: center;
  border-radius: 6px;
  background: $grey20;
  font-size: 13px;
  padding: 8px;
}
</style>
