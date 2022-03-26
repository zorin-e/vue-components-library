<template>
  <transition name="fade">
    <div
      v-if="value || isVisible"
      :class="$style.backdrop"
      ref="modal"
      @click="closeFromBackdrop"
    >
      <toast
        v-bind="$attrs"
        v-on="$listeners"
        tabindex="0"
        @keyup.escape="close"
        v-focus
      />
    </div>
  </transition>
</template>

<script>
import Toast from "@/components/Toast";

export default {
  inheritAttrs: false,
  props: {
    value: Boolean
  },
  components: {
    Toast
  },
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    close() {
      this.$emit("close");
      this.isVisible = false;
    },
    closeFromBackdrop(event) {
      if (event.target !== this.$refs.modal) return;
      this.close();
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  mounted() {
    this.isVisible = this.value;
  }
};
</script>

<style module lang="scss">
@import "@/styles/_mixins";

.backdrop {
  top: 0;
  left: 0;
  position: fixed;
  @include size(100%);
  background: rgb(229 229 229 / 80%);
  @include flex(center, center);
  z-index: 1;
}
</style>
