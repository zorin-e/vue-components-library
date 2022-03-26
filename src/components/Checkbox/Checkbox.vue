<template>
  <label
    :class="[
      $style.checkbox,
      disabled && $style['checkbox--disabled'],
      $style['checkbox--' + size],
      indeterminate ? $style['indeterminate'] : ''
    ]"
    :disabled="disabled"
  >
    <input
      :class="$style.checkbox__input"
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      @change="$emit('change', $event.target.checked)"
    />
    <div :class="[$style.checkbox__icon, $style['checkbox__icon--' + size]]">
      <component :is="iconComponent" :class="$style['checkbox__icon-el']" />
    </div>
    <slot>
      {{ label }}
    </slot>
  </label>
</template>

<script>
import CheckIcon from "./check_icon.svg";
import SelectionIcon from "./selection-icon.svg";
import Minus from "./minus.svg";

export default {
  name: "Checkbox",
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    checked: Boolean,
    disabled: Boolean,
    indeterminate: Boolean,
    label: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "md",
      validator(value) {
        return ["md", "lg"].includes(value);
      }
    },
    isSelectionIcon: Boolean
  },
  components: {
    CheckIcon,
    SelectionIcon,
    Minus
  },
  computed: {
    iconComponent() {
      return this.indeterminate
        ? "Minus"
        : this.isSelectionIcon
        ? "SelectionIcon"
        : "CheckIcon";
    }
  }
};
</script>

<style lang="scss" module>
@import "~@/styles/_mixins";
@import "~@/styles/_variables";

$el: ".checkbox";
$md: 16px;
$lg: 23px;

#{$el} {
  position: relative;

  &--md {
    padding-left: $md + 8px;
  }

  &--lg {
    padding-left: $lg + 8px;
  }

  &__input {
    display: none;

    .indeterminate & {
      ~ #{$el}__icon {
        color: $white;
        background: $green50;
        stroke: $white;
        border: 1px solid $green50;

        #{$el}__icon-el {
          display: block;
        }
      }
    }

    &:checked {
      ~ #{$el}__icon {
        background: $green50;
        color: $white;
        border: 1px solid $green50;

        #{$el}__icon-el {
          display: block;
        }
      }
    }
    &:disabled {
      ~ #{$el}__icon {
        background: $bgDisable;
        border: 1px solid $bgDisable;
      }
    }
    &:hover {
      ~ #{$el}__icon {
        background: $green70;
        border: 1px solid $green70;
      }
    }
    &:hover:not(:checked) {
      ~ #{$el}__icon {
        background: $white;
        border: 1px solid $green70;
      }
    }
    &:focus {
      ~ #{$el}__icon {
        background: $green70;
        border: 1px solid $green50;
        box-shadow: 0px 0px 4px $green60;
      }
    }
    &:focus:not(:checked) {
      ~ #{$el}__icon {
        background: $white;
        border: 1px solid $green50;
        box-shadow: 0px 0px 4px $green60;
      }
    }
    &:active {
      ~ #{$el}__icon {
        border: 1px solid $green50;
        box-shadow: 0px 0px 4px $green60;
      }
    }
    &:active:not(:checked) {
      ~ #{$el}__icon {
        background: $white;
        border: 1px solid $green50;
        box-shadow: 0px 0px 4px $green60;
      }
    }
  }
  &--disabled {
    pointer-events: none;
    @include disabled;
  }

  &__icon {
    left: 0;
    top: 0;
    position: absolute;
    border: 1px solid $grey30;
    background: $white;
    border-radius: 2px;

    &--md {
      @include size($md);
    }

    &--lg {
      @include size($lg);
    }

    &-el {
      position: absolute;
      display: none;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.indeterminate {
  // pointer-events: none;
}
</style>
