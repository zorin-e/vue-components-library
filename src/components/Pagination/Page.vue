<template>
  <div @click="$emit('click')">
    <router-link
      :to="{
        query: { ...$route.query, page },
        params: {
          fromFunction: true
        }
      }"
      :class="[$style.pagination, $style.page, isActive && $style.active]"
    >
      {{ text }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: [String, Number],
      default: ""
    },
    page: [String, Number, undefined],
    isActive: Boolean
  }
};
</script>

<style module lang="scss">
@import "./assets/styles.scss";

.page {
  border-radius: 4px;
  font-size: 16px;

  &:hover {
    text-decoration: none;
  }

  &:hover:not(.active) {
    background: #cdcdcd;
  }
}

.active {
  cursor: default;
  background: #4da32e;
  color: #fff;
}
</style>
