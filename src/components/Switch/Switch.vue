<template>
  <label :class="$style.switch">
    <input v-model="value" type="checkbox" v-on="inputListeners" />
    <span :class="[$style.slider, $style.round]"></span>
    <check-icon :class="$style['check-icon']" />
    <check-off-icon
      :class="[$style['check-icon'], $style['check-icon--off']]"
    />
  </label>
</template>
<script>
import CheckIcon from "./check_icon.svg";
import CheckOffIcon from "./check-off.svg";

export default {
  components: { CheckIcon, CheckOffIcon },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    inputListeners() {
      return {
        ...this.$listeners,
        ...{
          input: () => {
            this.$emit("input", !this.value);
          }
        }
      };
    }
  }
};
</script>
<style lang="scss" module>
@import "~@/styles/_variables";

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  color: $white;
  cursor: pointer;

  svg {
    stroke: currentColor;
    fill: currentColor;
  }
}

.check-icon {
  position: absolute;
  top: 4px;
  left: 4px;

  &--off {
    left: auto;
    right: 4px;
  }
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $grey40;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: $green60;
}

input:checked + .slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 16px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
