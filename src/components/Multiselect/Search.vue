<template>
  <div :class="[$style.search, isFocus && $style.focus]">
    <base-input
      wide
      size="s"
      without-indent
      without-styles
      placeholder="Поиск"
      v-model="search"
      v-on="$listeners"
      @focus="toggleFocus"
      @blur="toggleFocus"
      ref="input"
    />
    <magnifier v-if="!hasSearchText" :class="$style.magnifier" />
    <clear-input v-else @click="clearSearch" />
  </div>
</template>

<script>
import { Input as BaseInput } from "@/";
import Magnifier from "./magnifier.svg";
import ClearInput from "./clear-input.svg";

export default {
  components: {
    BaseInput,
    Magnifier,
    ClearInput
  },
  data() {
    return {
      search: "",
      isFocus: false
    };
  },
  methods: {
    toggleFocus({ type }) {
      this.isFocus = type === "focus";
    },
    clearSearch() {
      this.$refs.input.focus();
      this.search = "";
      this.$emit("input", "");
    }
  },
  computed: {
    hasSearchText() {
      return this.search.length > 0;
    }
  },
  mounted() {
    this.$refs.input.focus();
  }
};
</script>

<style lang="scss" module>
@import "~@/styles/_variables";
@import "~@/styles/_mixins";

.search {
  padding: 0px 16px 1px 5px;
  border: solid 1px transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom-color: $dropdownBorder;
  @include flex(null, center);
  position: sticky;
  top: -8px;
  z-index: 1;
  background: $white;
}

.focus {
  border-color: $grey70;
}
</style>
