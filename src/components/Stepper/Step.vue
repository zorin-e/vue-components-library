<template>
  <div
    :class="[
      $style.step,
      isActive && !isFinish && $style.active,
      isFinish && $style.finish
    ]"
    v-on="$listeners"
  >
    {{ title }}
    <error-icon v-if="isError" class="ml-5" />
    <finish-icon v-if="isFinish" class="ml-10 mr-15" />
  </div>
</template>

<script>
import ErrorIcon from "./error.svg";
import FinishIcon from "./finish.svg";

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    isActive: Boolean,
    isError: {
      type: Number,
      default: 0
    },
    isFinish: Boolean
  },
  components: {
    ErrorIcon,
    FinishIcon
  }
};
</script>

<style lang="scss" module>
@import "@/styles/_mixins";

.step {
  height: 32px;
  border-top: solid 1px #fff;
  border-bottom: solid 1px #fff;
  border-radius: 4px;
  padding: 0 7px 0 16px;
  font-size: 16px;
  background: #757575;
  color: #fff;
  position: relative;
  @include flex(center, center);

  &:not(.active) {
    cursor: pointer;
  }

  &::after {
    content: "";
    position: absolute;
    display: block;
    @include size(22px);
    background-color: inherit;
    border: inherit;
    position: absolute;
    clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
    transform: rotate(225deg);
    border-radius: 0 0 0 0.25em;
    right: -10px;
    z-index: 1;
    border: solid 1px #fff;
  }
}

.active {
  background: #333333;
}

.finish {
  background: #3b7b23;

  &::after {
    display: none;
  }
}
</style>
