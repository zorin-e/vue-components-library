<template>
  <!-- <transition :name="direction"> -->
  <!-- <template v-if="value"> -->
  <div :class="$style.wrapper">
    <transition name="fade">
      <div :class="$style.mask" v-if="value && withMask"></div>
    </transition>

    <transition :name="direction" v-on="$listeners">
      <div
        v-if="value"
        class="modal-container"
        :class="[
          $style.container,
          $style['container_' + size],
          $style['container--' + direction]
        ]"
      >
        <div :class="$style.header">
          <div :class="$style.header__title">
            <slot name="header" />
          </div>
          <div :class="$style.header__controls">
            <div :class="$style.header__close" @click="$emit('input', false)">
              <icon-close />
            </div>
          </div>
        </div>
        <div :class="$style.body">
          <slot name="body" />
          <div :class="$style.footer" class="mt-20">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </div>
  <!-- </template>
  </transition> -->
</template>
<script>
import IconClose from "./assets/close.svg";
export default {
  name: "Modal",
  components: { IconClose },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: "center",
      validator: function(value) {
        return ["center", "right", "center-right"].includes(value);
      }
    },
    withMask: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "xs",
      validator: function(value) {
        return ["", "xs", "s", "m", "l"].includes(value);
      }
    }
  }
};
</script>

<style lang="scss" module>
@import "~@/styles/_variables";

.mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}

.wrapper {
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 9999;
  justify-content: center;
  align-self: center;
  align-items: center;
}

.container {
  position: fixed;
  z-index: 9999;
  background-color: $white;
  max-height: 100%;
  box-shadow: -10px 0px 16px rgba(51, 51, 51, 0.1);
  width: 100%;

  &--center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &--right {
    right: 0;
    top: 20xp;
    bottom: 0px;
    // height: calc(100% - 40px);
  }
  &--center-right {
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }

  &_xs {
    max-width: 300px;
  }
  &_s {
    max-width: 600px;
  }
  &_m {
    max-width: 900px;
  }
  &_l {
    max-width: 1200px;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 0 0 0 32px;
  height: 56px;
  border-bottom: 1px solid $block_border;

  &__title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: $title;
    font-size: 24px;
    line-height: 32px;
  }
  &__controls {
    border-left: 1px solid $block_border;
  }
  &__close {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    cursor: pointer;
  }
}

.footer {
  display: flex;
  justify-content: flex-end;
  padding: 0 0 24px 0;
}

.body {
  padding: 0 30px;
  margin-top: 20px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}
</style>

<style>
.center-enter-active {
  animation: from-center-in 0.3s;
}
.center-leave-active {
  animation: to-center 0.3s;
}
@keyframes from-center-in {
  0% {
    opacity: 0;
    /* transform: scale(0); */
    /* transform: scale(0); */
  }
  100% {
    opacity: 1;
    /* transform: scale(1); */
  }
}
@keyframes to-center {
  0% {
    opacity: 1;
    /* transform: scale(1); */
    /* transform: scale(1); */
  }

  100% {
    opacity: 0;
    /* opacity: 0; */
    /* transform: scale(0); */
    /* transform: scale(0); */
  }
}

.right-enter-active {
  animation: from-right-in 0.3s;
}
.right-leave-active {
  animation: to-right-in 0.3s;
}

.center-right-enter-active {
  animation: from-center-right-in 0.3s;
}
.center-right-leave-active {
  animation: to-center-right-in 0.3s;
}

@keyframes from-right-in {
  0% {
    transform: translateX(100%);
    /* transform: scale(0); */
  }
  100% {
    /* transform: scale(1); */
    transform: translateX(0%);
  }
}
@keyframes to-right-in {
  0% {
    transform: translateX(0%);
    /* transform: scale(0); */
  }
  100% {
    transform: translateX(100%);
    /* transform: scale(1); */
  }
}

@keyframes from-center-right-in {
  0% {
    transform: translate(100%, -50%);
    /* transform: scale(0); */
  }
  100% {
    /* transform: scale(1); */
    transform: translate(0%, -50%);
  }
}
@keyframes to-center-right-in {
  0% {
    transform: translate(0%, -50%);
    /* transform: scale(0); */
  }
  100% {
    transform: translate(100%, -50%);
    /* transform: scale(1); */
  }
}
</style>
