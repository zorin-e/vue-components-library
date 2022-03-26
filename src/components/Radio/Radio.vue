<template>
  <div :class="[$style.radio, disabled && $style.disabled]">
    <label :for="defaultId" :style="labelStyles">
      <input
        :id="defaultId"
        :name="name"
        :disabled="disabled"
        :value="optionValue"
        :checked="isChecked"
        type="radio"
        @change="update($event)"
      />
      <slot
        ><span>{{ label }}</span></slot
      >
    </label>
  </div>
</template>
<script>
import { getRandomId } from "@/infrastructure/getRandomId";

export default {
  data() {
    return {
      defaultId: this.id || getRandomId("Radio")
    };
  },
  props: {
    name: String,
    label: String,
    optionValue: {
      type: [String, Number, Boolean],
      default: false
    },
    value: [String, Number, Boolean],
    disabled: Boolean,
    labelStyles: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    update() {
      this.$emit("input", this.optionValue);
    }
  },
  computed: {
    isChecked() {
      return this.optionValue === this.value;
    }
  }
};
</script>
<style lang="scss" module>
@import "~@/styles/_variables";
@import "~@/styles/_variables";
@import "~@/styles/_mixins";

@mixin ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  // overflow: hidden;
}

$radioDiameter: 16px;

.radio {
  label {
    display: block;
    padding: 14px 15px 15px 2em;
    position: relative;
    z-index: 1;
    line-height: 14px;
    text-align: left;
    cursor: pointer;
    @include ellipsis();
    input {
      position: absolute;
      left: -99999px;
      &:disabled ~ span {
        color: $bgDisable;
      }
      &:checked {
        & ~ span:after {
          position: absolute;
          border-radius: 50%;
          @include size(8px);
          background: $green50;
          content: "";
          left: 4px;
          top: 17px;
          top: 48%;
          transform: translateY(-50%);
        }
      }
      &:disabled {
        & ~ span:after {
          background: $bgDisable;
        }
        & ~ span:before {
          border: solid 1px $bgDisable;
          background: $grey20;
        }
      }
      &:hover {
        & ~ span:after {
          background: $green60;
        }
        & ~ span:before {
          border: solid 1px $green60;
        }
      }
      &:focus {
        & ~ span:after {
          background: $green60;
        }
        & ~ span:before {
          border: solid 1px $green60;
          box-shadow: 0px 0px 4px $green60;
        }
      }
    }
    & > span {
      &:before {
        content: "";
        position: absolute;
        left: 0;
        border-radius: 50%;
        box-sizing: border-box;
        width: $radioDiameter;
        height: $radioDiameter;
        border: solid 1px $grey30;
        top: 48%;
        transform: translateY(-50%);
        background: $bg;
      }
    }
  }
}

.disabled {
  pointer-events: none;
}
</style>
