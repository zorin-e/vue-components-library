<template>
  <button
    :type="type"
    :class="buttonClass"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <div v-if="$slots['left-icon']" :class="$style['left-icon-wrapper']">
      <slot name="left-icon" v-if="!isLoading" />
    </div>
    <slot v-if="!isLoading">
      {{ title }}
    </slot>
    <div v-if="$slots['right-icon']" :class="$style['right-icon-wrapper']">
      <slot name="right-icon" v-if="!isLoading" />
    </div>
    <spinner v-if="isLoading" size="xs" color="#cdcdcd" />
  </button>
</template>

<script>
import Spinner from "@/components/Spinner";
export default {
  name: "Button",
  components: {
    Spinner
  },
  props: {
    title: {
      type: String,
      default: "Button"
    },
    color: {
      type: String,
      default: "primary",
      validator: function(value) {
        return ["primary", "secondary", "tertiary"].includes(value);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "l",
      validator: function(value) {
        return ["l", "m", "s"].includes(value);
      }
    },
    type: {
      type: String,
      default: "button"
    },
    isLoading: Boolean,
    wide: Boolean
  },
  computed: {
    buttonClass() {
      return [
        this.$style.button,
        this.fill
          ? this.$style["color_" + this.color + "_fill"]
          : this.$style["color_" + this.color],
        this.$style["size_" + this.size],
        this.wide && this.$style.wide
      ];
    }
  }
};
</script>
<style lang="scss" module>
@import "~@/styles/_variables";
@import "~@/styles/_mixins";

.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-radius: 4px;
  cursor: pointer;
  border: 0;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  &:focus {
    outline: none;
  }
}
.left-icon-wrapper {
  margin-right: 10px;
}
.right-icon-wrapper {
  margin-left: 10px;
}
.color {
  &_primary {
    @include buttonDefault($green50, $white, $green30);

    &:focus {
      @include buttonFocus($green60, $white, $green70);
    }

    &:hover {
      @include buttonHover($green70, $white, $green30);
    }

    &:active {
      @include buttonDefault($accentTexActive, $white, $green30);
    }

    &:disabled {
      @include buttonDefault($bgDisable, $greysLightGrey, $bgDisable);
      cursor: default;
    }
  }
  &_secondary {
    @include buttonDefault($white, $green30, $green30);

    &:focus {
      @include buttonFocus($green70, $green70, $green70);
    }

    &:hover {
      @include buttonHover($white, $green70, $green70);
    }

    &:active {
      @include buttonDefault($white, $accentTexActive, $accentTexActive);
    }

    &:disabled {
      @include buttonDefault($white, $bgDisable, $bgDisable);
      cursor: default;
    }
  }

  &_tertiary {
    @include buttonDefault($greysLightGrey, $grey60, $bgDisable);

    &:focus {
      @include buttonFocus($green30, $green30, $green30);
    }

    &:hover {
      @include buttonHover($greysLightGrey, $green30, $green30);
    }

    &:active {
      @include buttonDefault($green80, $accentTexActive, $accentTexActive);
    }

    &:disabled {
      @include buttonDefault($greysLightGrey, $bgDisable, $bgDisable);
      cursor: default;
    }
  }
}

.size {
  &_s {
    height: 32px;
    font-size: 16px;
    line-height: 24px;
  }
  &_m {
    height: 40px;
    font-size: 14px;
    line-height: 17px;
  }
  &_l {
    height: 48px;
    font-size: 16px;
    line-height: 19px;
  }
}

.wide {
  width: 100%;
}
</style>
