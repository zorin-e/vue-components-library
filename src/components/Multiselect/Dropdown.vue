<template>
  <div :class="$style.dropdown" tabindex="0" @keyup.escape="$emit('escape')">
    <search :class="$style.search" @input="debounceSearch" />
    <item :center="!hasItems">
      <checkbox
        v-if="hasItems"
        label="Выбрать все"
        :is-selection-icon="hasSelected"
        :checked="selectedNotAll || selectedAll"
        @change="selectAllItems"
      />
      <template v-else>Нет элементов</template>
    </item>
    <item
      v-for="(item, index) in searchedItems"
      :key="item.id"
      :active="index === arrowCounter"
    >
      <checkbox
        :label="item.name"
        @change="selectItem($event, item.id)"
        :checked="item.checked"
      />
    </item>
  </div>
</template>

<script>
import Item from "./Item";
import { Checkbox } from "@/";
import Search from "./Search";
import debounce from "lodash/debounce";

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    arrowCounter: Number
  },
  components: {
    Item,
    Checkbox,
    Search
  },
  data() {
    return {
      search: ""
    };
  },
  methods: {
    selectItem(isChecked, id) {
      this.$emit("selectItem", { isChecked, id });
    },
    selectAllItems(isChecked) {
      this.$emit("selectAllItems", { isChecked, ids: this.searchedIds });
    },
    searchItems(value) {
      this.search = value;
    }
  },
  computed: {
    hasItems() {
      return this.searchedItems.length > 0;
    },
    selectedAmount() {
      return this.items.reduce(
        (accum, item) => (item.checked ? ++accum : accum),
        0
      );
    },
    selectedAll() {
      return this.selectedAmount === this.items.length;
    },
    selectedNotAll() {
      return this.selectedAmount >= 1 && !this.selectedAll;
    },
    hasSelected() {
      return this.selectedAll || this.selectedNotAll;
    },
    searchedItems() {
      return this.items.filter(item =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    searchedIds() {
      return this.searchedItems.map(item => item.id);
    }
  },
  created() {
    this.debounceSearch = debounce(this.searchItems, 200);
  }
};
</script>

<style lang="scss" module>
@import "~@/styles/_variables";
@import "~@/styles/_mixins";

.dropdown {
  outline: none;
  width: 100%;
  max-height: 280px;
  overflow-y: auto;
  border: solid 1px $dropdownBorder;
  box-shadow: 0px 4px 6px rgba(157, 157, 157, 0.22);
  border-radius: 4px;
  padding: 8px 0;
  background: $white;
}

.search {
  margin-top: -8px;
  margin-bottom: 10px;
}
</style>
