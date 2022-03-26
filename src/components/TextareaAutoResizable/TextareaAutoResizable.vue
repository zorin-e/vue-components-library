<template>
  <div
    :class="[
      $style.wrapper,
      wide && $style.wide,
      disabled && $style.disabled,
      $style.textarea,
      $style['textarea-' + size],
      value && $style.filled,
      wide && $style.wide,
      $style.isAutoResizable
    ]"
    :contenteditable="!disabled"
    v-on="inputListeners"
    v-bind="$attrs"
    :value="value"
    :disabled="disabled"
    :style="{
      maxHeight,
      minHeight
    }"
  ></div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: "Textarea",
  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    size: {
      type: String,
      default: "lg",
      validator: value => ["lg", "md", "sm", "xs"].includes(value)
    },
    disabled: Boolean,
    label: {
      type: String,
      default: ""
    },
    wide: Boolean,
    isAutoResizable: Boolean,
    maxHeight: {
      type: String,
      default: ""
    },
    minHeight: {
      type: String,
      default: ""
    }
  },
  computed: {
    inputListeners() {
      return {
        ...this.$listeners,
        ...{
          input: event => {
            this.$emit("input", event.target.innerText);
          }
        }
      };
    }
  }
};
</script>

<style lang="scss" module>
@import "~@/styles/_variables";
@import "~@/styles/_mixins";

.wrapper {
  position: relative;
  display: block;
}

.textarea {
  outline: none;
  padding: 15px;
  min-width: 360px;
  min-height: 36px;
  max-height: 150px;
  outline: none;
  overflow-y: auto;

  &[contenteditable][placeholder]:empty:before {
    content: attr(placeholder);
    color: $grey;
    background-color: transparent;
    font-size: 16px;
  }

  &:focus {
    @include fieldShadow;
  }

  &-lg {
    @include input($fieldFontSizeLg, 18px, 15px, 12px);
  }

  &-md {
    @include input($fieldFontSizeMd, 16px, 13px, 11px);
  }

  &-sm {
    @include input($fieldFontSizeSm, 11px, 11px);
  }

  &-xs {
    @include input($fieldFontSizeXs, 10px, 10px);
  }
}

.disabled {
  opacity: 0.7;
  pointer-events: none;
}

.wide {
  width: 100%;
}
</style>
