<template>
  <div :class="$style.wrapper">
    <component
      :is="inputComponent"
      v-model="search"
      @input="onChange"
      @change="data => $emit('change', data)"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
      @keyup.escape="onEscape"
      v-bind="$attrs"
    />
    <transition name="slide-left">
      <ul v-if="isOpen" :class="$style.list">
        <li
          v-for="(item, index) in results"
          :key="index"
          :class="[
            $style.item,
            index === arrowCounter && $style['item-active']
          ]"
          @click="
            setResult({
              result: item
            })
          "
        >
          {{ item._displayedValue }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import isEqual from "lodash/isEqual";
import BaseInput from "@/components/Input";
import BaseTextarea from "@/components/Textarea";

export default {
  name: "Autocomplete",
  inheritAttrs: false,
  props: {
    inputComponent: {
      type: String,
      default: "BaseInput"
    },
    value: {
      type: String,
      default: ""
    },
    items: {
      type: Array,
      default: () => []
    },
    filter: Boolean
  },
  components: {
    BaseInput,
    BaseTextarea
  },
  data() {
    return {
      search: "",
      isOpen: false,
      results: [],
      arrowCounter: -1
    };
  },
  methods: {
    onChange() {
      this.$emit("input", { value: this.search });
      this.handleResults();
    },
    setResult({ result, isItemSelected = true }) {
      this.search = result._selectedValue;
      this.closeAutocomplete();
      this.$emit("input", result, isItemSelected);
    },
    handleResults() {
      if (this.filter) this.results = this.filterResults(this.items);
      if (this.isResults) this.openAutocomplete();
      else this.closeAutocomplete();
    },
    filterResults(items) {
      return items.filter(
        item =>
          item._displayedValue
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1
      );
    },
    onArrowDown(event) {
      event.preventDefault();
      if (this.arrowCounter >= this.results.length - 1) return;
      this.arrowCounter++;
    },
    onArrowUp(event) {
      event.preventDefault();
      if (this.arrowCounter < 0) return;
      this.arrowCounter--;
    },
    onEnter() {
      if (this.arrowCounter < 0) return;
      this.setResult({
        result: this.results[this.arrowCounter]
      });
    },
    handleClickOutside(event) {
      if (this.$el.contains(event.target) || !this.isOpen) return;
      this.closeAutocomplete();
    },
    onEscape() {
      this.closeAutocomplete();
    },
    openAutocomplete() {
      this.isOpen = true;
    },
    closeAutocomplete() {
      this.arrowCounter = -1;
      this.isOpen = false;
    },
    setInitialResults() {
      this.results = [...this.items];
    }
  },
  watch: {
    items(value, oldValue) {
      if (isEqual(value, oldValue)) return;
      this.results = [...value];
      this.openAutocomplete();
    },
    value(value) {
      this.search = value;
    }
  },
  computed: {
    isResults() {
      return this.results.length > 0;
    },
    isItems() {
      return this.items.length > 0;
    }
  },
  created() {
    this.search = this.value;
    if (this.isItems) this.setInitialResults();
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  }
};
</script>

<style lang="scss" module>
@import "@/styles/_variables";

.wrapper {
  position: relative;
}

.list {
  background: $white;
  border: solid 1px $block_border;
  max-height: 250px;
  overflow: auto;
  border-radius: $radius;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 100%;
  width: 100%;
  margin-top: 9px;
  z-index: 1;
}

.item {
  font-size: 16px;
  padding: 17px;

  &-active,
  &:hover {
    color: $link;
    background: $bg;
    cursor: pointer;
  }
}

.input {
  width: 100%;
}
</style>
