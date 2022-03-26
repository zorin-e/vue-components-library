<template>
  <div
    :class="[
      $style.container,
      fillHeight && $style['fill-height'],
      alignH && $style['align-h-center'],
      alignV && $style['align-v-center'],
      column && $style['direction-column'],
      wide && $style['container--wide']
    ]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "Container",
  props: {
    fillHeight: {
      type: Boolean,
      default: false
    },
    alignV: {
      type: Boolean,
      default: false
    },
    alignH: {
      type: Boolean,
      default: false
    },
    column: {
      type: Boolean,
      default: false
    },
    wide: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" module>
@import "~@/styles/_variables";
@import "~bootstrap/scss/mixins/_grid";

.container {
  display: flex;
  @include make-container();
  @include make-container-max-widths();

  &--wide {
    max-width: 1440px;
  }
}

.fill-height {
  height: 100%;
}

.align {
  &-v {
    &-center {
      align-items: center;
    }
  }
  &-h {
    &-center {
      justify-content: center;
    }
  }
}

.direction-column {
  flex-direction: column;
}
</style>
