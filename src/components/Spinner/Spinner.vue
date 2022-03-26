<template>
  <div
    :class="[$style.spinner, $style['spinner-' + size]]"
    :style="{ 'border-top-color': color }"
  ></div>
</template>

<script>
export default {
  name: "Spinner",
  props: {
    size: {
      type: String,
      default: "md",
      validator(size) {
        return ["xs", "sm", "md", "lg"].includes(size);
      }
    },
    color: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" module>
@import "@/styles/_variables";
@import "@/styles/_mixins";

$sizes: "xs" 25px, "sm" 35px, "md" 45px, "lg" 55px;

.spinner {
  border: 4px solid transparent;
  border-radius: 50%;
  border-top: 4px solid $link;
  animation: spin 0.8s linear infinite;

  @each $name, $size in $sizes {
    &-#{$name} {
      @include size($size);
    }
  }
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
