<template>
  <div :class="$style.tabs">
    <div :class="[$style.controls, isSpaceBetween && $style.spaceBetween]">
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="[
          $style.tab,
          $style['tab-' + size],
          value === index && [$style.active, $style['active-' + size]]
        ]"
        @click="$emit('input', index)"
      >
        {{ item.title }}
        <error-icon v-if="item.isError" class="ml-5" />
      </div>
    </div>
    <div :class="$style.items">
      <div :class="$style.item">
        <slot :name="items[value].slot" />
      </div>
    </div>
  </div>
</template>
<script>
import ErrorIcon from "./error.svg";

export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    items: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: "m",
      validator: function(value) {
        return ["xs", "s", "m", "l"].includes(value);
      }
    },
    isSpaceBetween: Boolean
  },
  components: {
    ErrorIcon
  }
};
</script>
<style lang="scss" module>
@import "~@/styles/variables";

.controls {
  display: flex;
  padding: 3px 3px 0 3px;
  background: $white;
  border-radius: 8px 8px 0px 0px;
  border-bottom: 1px solid $grey70;
}

.tab {
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  color: $grey60;
  padding: 0 12px;
  font-size: 16px;
  line-height: 24px;
  height: 48px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  &-s {
    font-size: 14px;
    line-height: 20px;
    height: 20px;
    margin-bottom: 4px;
  }
}

.active {
  color: $green30;

  &::after {
    content: "";
    position: absolute;
    background: $green30;
    bottom: -1px;
    left: 0;
    height: 2px;
    width: 100%;
  }

  &-s {
    &::after {
      bottom: -5px;
    }
  }
}

.items {
  background: $white;
  border-radius: 0px 0px 8px 8px;
}

.spaceBetween {
  justify-content: space-between;
}
</style>
