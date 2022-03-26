<template>
  <label
    :class="[$style.wrapper, wide && $style.wide, disabled && $style.disabled]"
  >
    <textarea
      :class="[
        $style.textarea,
        $style['textarea-' + size],
        value && $style.filled,
        wide && $style.wide
      ]"
      v-on="inputListeners"
      v-bind="$attrs"
      :value="value"
      :disabled="disabled"
    ></textarea>
  </label>
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
    wide: Boolean
  },
  computed: {
    inputListeners() {
      return {
        ...this.$listeners,
        ...{
          input: event => {
            this.$emit("input", event.target.value);
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
  border: solid 1px $fieldBorder;
  outline: none;
  background: $bg;
  padding: 15px;
  min-width: 360px;
  min-height: 111px;

  &:focus {
    @include fieldShadow;
  }

  &:focus,
  &:hover {
    background: transparent;
  }

  &-lg {
    @include input($fieldFontSizeLg);
  }

  &-md {
    @include input($fieldFontSizeMd);
  }

  &-sm {
    @include input($fieldFontSizeSm);
  }

  &-xs {
    @include input($fieldFontSizeXs);
  }
}

.disabled {
  opacity: 0.7;
}

.wide {
  width: 100%;
}
</style>
