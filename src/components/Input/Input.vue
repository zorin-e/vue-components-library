<template>
  <div :class="[$style.wrapper, wide && $style.wide]">
    <label v-if="label" :class="[$style.label, $style['label-' + size]]">
      {{ label }}
    </label>
    <div
      :class="[
        $style['input-wrapper'],
        $slots.left ? $style['padding-left'] : '',
        $slots.right ? $style['padding-right'] : ''
      ]"
    >
      <div
        :class="[$style['left-slot'], $style['left-slot-' + size]]"
        v-if="$slots.left"
      >
        <slot name="left"> </slot>
      </div>
      <input
        v-if="isMask"
        :type="type"
        v-bind="$attrs"
        v-on="inputListeners"
        :value="value"
        :disabled="disabled"
        v-mask="mask"
        :class="inputClasses"
        ref="input"
      />
      <input
        v-else
        :type="showPass ? 'text' : type"
        v-bind="$attrs"
        v-on="inputListeners"
        :value="value"
        :disabled="disabled"
        :class="inputClasses"
        ref="input"
      />

      <div
        :class="[$style['right-slot'], $style['right-slot-' + size]]"
        v-if="$slots.right || type == 'password'"
      >
        <template v-if="type == 'password'">
          <div :class="$style['pass-icon']" @click="showPass = !showPass">
            <show-icon v-if="!showPass" />
            <hide-icon v-if="showPass" />
          </div>
        </template>
        <slot name="right"> </slot>
      </div>
      <success-icon v-if="isSuccess" :class="$style.successIcon" />
    </div>
  </div>
</template>

<script>
import ShowIcon from "@/assets/icon_show.svg";
import HideIcon from "@/assets/icon_hide.svg";
import SuccessIcon from "./success.svg";

export default {
  inheritAttrs: false,
  name: "Input",
  components: {
    ShowIcon,
    HideIcon,
    SuccessIcon
  },
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: "text"
    },
    size: {
      type: String,
      default: "l",
      validator: value => ["l", "m", "s"].includes(value)
    },
    disabled: Boolean,
    label: {
      type: String,
      default: ""
    },
    wide: Boolean,
    mask: {
      type: Object,
      default: () => ({})
    },
    isError: Boolean,
    withoutStyles: Boolean,
    isSuccess: Boolean
  },
  data() {
    return {
      showPass: false
    };
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    blur() {
      this.$refs.input.blur();
    }
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
    },
    inputClasses() {
      return [
        this.$style.input,
        !this.withoutStyles && this.$style.border,
        this.withoutStyles && this.$style.flat,
        this.$style["input-" + this.size],
        this.disabled && this.$style.disabled,
        this.wide && this.$style.wide,
        this.value && this.$style.filled,
        this.isError && this.$style.error,
        this.isSuccess && [this.$style.success, this.$style.successIndent]
      ];
    },
    isMask() {
      return Object.keys(this.mask).length > 0;
    }
  }
};
</script>

<style lang="scss" module>
@import "~@/styles/_variables";
@import "~@/styles/_mixins";

.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 16px;
  line-height: 24px;
  color: $grey;
  top: 4px;

  &-l {
    font-size: 20px;
    top: 0px;
  }

  &-m {
    top: 2px;
  }

  &-s {
    top: 3px;
  }
}

.border {
  border: solid 1px $bgDisable;

  &:focus {
    border: solid 1px $green30;
    box-shadow: 0px 0px 4px $green60;
  }
  &:hover {
    border: solid 1px $green30;
  }
}

.flat {
  border: 0;
}

.input {
  outline: none;

  &-l {
    @include input($fieldFontSizeLg, 15px, 15px, 12px, 8px);

    .padding-left & {
      padding-left: 28px;
    }
    .padding-right & {
      padding-right: 28px;
    }
  }

  &-m {
    @include input($fieldFontSizeMd, 13px, 13px, 11px, 8px);

    .padding-left & {
      padding-left: 26px;
    }
    .padding-right & {
      padding-right: 26px;
    }
  }

  &-s {
    @include input($fieldFontSizeMd, 8px, 8px);

    height: 40px;

    .padding-left & {
      padding-left: 26px;
    }
    .padding-right & {
      padding-right: 26px;
    }
  }

  &:disabled {
    border: solid 1px $grey20;
    background: $grey20;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
}

.input-wrapper {
  position: relative;
}

.left-slot {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  height: 100%;

  &-l {
    width: 28px;
  }

  &-m {
    width: 26px;
  }

  &-s {
    width: 26px;
  }
}
.right-slot {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  height: 100%;

  &-l {
    width: 28px;
  }

  &-m {
    width: 26px;
  }

  &-s {
    width: 26px;
  }
}

.wide {
  width: 100%;
}

.error {
  border-color: $errorText;

  &:focus,
  &:hover {
    border-color: $errorText;
  }
}

.pass-icon {
  margin-right: 12px;
  cursor: pointer;
}

.success {
  border: solid 1px $green30;

  &Icon {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 19px;
  }

  &Indent {
    padding-right: 38px;
  }
}
</style>
