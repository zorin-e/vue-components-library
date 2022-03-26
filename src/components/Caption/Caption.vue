<template function>
  <div :class="[$style.caption, $style[theme]]">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      validator: item => ["light"].includes(item)
    }
  }
};
</script>

<style lang="scss" module>
.caption {
  font-size: 16px;
  color: #333333;
  line-height: 24px;
}

.light {
  color: #757575;
}
</style>
