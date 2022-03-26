<template>
  <label class="flex" :class="(disabled || isLoading) && $style.disabled">
    <div v-if="!withoutInput" :class="$style.wrapper" class="mr-15">
      <transition name="fade">
        <div v-if="label && value" :class="$style.label">
          {{ label }}
        </div>
      </transition>
      <div :class="$style.input">
        {{ value || label }}
      </div>
      <div v-if="isLoading" :class="$style.loader"></div>
    </div>
    <div :class="$style.button">
      <input
        type="file"
        v-bind="$attrs"
        @input="handleFile"
        :class="$style.file"
      />
      <icon-upload :class="$style.buttonIcon" />
    </div>
  </label>
</template>

<script>
import IconUpload from "./upload.svg";

export default {
  components: {
    IconUpload
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    disabled: Boolean,
    withoutInput: Boolean,
    isLoading: Boolean
  },
  methods: {
    handleFile(event) {
      this.$emit("input", event.target.files);
    }
  }
};
</script>

<style lang="scss" module>
@import "@/styles/_variables";
@import "@/styles/_mixins";

.file {
  display: none;
}

.button {
  background: $link;
  @include size(54px);
  display: block;
  border-radius: $radius;
  cursor: pointer;
  transition: opacity 0.2s linear;
  position: relative;

  &:hover {
    opacity: 0.9;
  }

  &Icon {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;

    path {
      stroke: $white;
    }
  }
}

.wrapper {
  position: relative;
  width: 100%;
  max-width: 300px;
}

.label {
  position: absolute;
  font-size: 10px;
  color: $grey;
  padding-left: 15px;
  top: 5px;
}

.input {
  border: solid 1px $fieldBorder;
  outline: none;
  background: $bg;
  @include input($fieldFontSizeLg, 18px, 15px, 12px);
  @include size(100%);
  overflow: hidden;
}

.disabled {
  opacity: 0.7;
  pointer-events: none;
}

.filled {
  background: $bgFilledInput;
}

.loader {
  position: absolute;
  border: 4px solid $bg;
  border-radius: 50%;
  border-top: 4px solid $link;
  width: 30px;
  height: 30px;
  animation: spin 0.8s linear infinite;
  right: 10px;
  top: 10px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
