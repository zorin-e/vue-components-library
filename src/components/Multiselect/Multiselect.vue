<template>
  <div :class="$style.wrapper" v-click-outside="close">
    <div
      :class="[
        $style.multiselect,
        isOpen && $style.multiselectFocus,
        isError && $style.error
      ]"
      @click="toggle"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keyup.escape="onEscape"
      @keydown.enter="onSelect"
      @keydown.space="onSelect"
      v-bind="$attrs"
      ref="multiselect"
      tabindex="0"
    >
      <div :class="$style.inner">
        <div
          :class="[$style.text, isOpen && $style.textActive]"
          v-if="!amountCheckedItems"
        >
          Выберите значение
        </div>
        <div v-else :class="$style.chips">
          <chips
            v-for="id in value"
            :key="id"
            :id="id"
            :text="itemsById[id]"
            @unselectItem="unselectItem"
          />
        </div>
        <div :class="$style.controls">
          <counter
            v-if="amountCheckedItems"
            :class="$style.counter"
            :amount="amountCheckedItems"
            @unselectAll="unselectAll"
          />
          <div :class="[$style.arrow, isOpen && $style.arrowActive]">
            <arrow-down />
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <dropdown
        v-if="isOpen"
        :class="$style.dropdown"
        :items="matchedItems"
        :arrowCounter="arrowCounter"
        @selectItem="selectItem"
        @selectAllItems="selectAllItems"
        @escape="onEscape"
      />
    </transition>
  </div>
</template>

<script>
import ClickOutside from "@/directives/clickOutside.js";
import Dropdown from "./Dropdown";
import Counter from "./Counter";
import Chips from "./Chips";
import ArrowDown from "./arrow-down.svg";

export default {
  model: {
    event: "change"
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    },
    isError: Boolean
  },
  components: {
    ArrowDown,
    Dropdown,
    Counter,
    Chips
  },
  directives: {
    ClickOutside
  },
  data() {
    return {
      isOpen: false,
      arrowCounter: -1
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    close() {
      this.arrowCounter = -1;
      this.isOpen = false;
    },
    onEscape() {
      this.close();
      this.$refs.multiselect.blur();
    },
    onArrowDown(event) {
      event.preventDefault();
      if (this.arrowCounter >= this.items.length - 1) return;
      this.arrowCounter++;
    },
    onArrowUp(event) {
      event.preventDefault();
      if (this.arrowCounter < 0) return;
      this.arrowCounter--;
    },
    onSelect() {
      const { id, checked } = this.matchedItems[this.arrowCounter];
      if (this.arrowCounter < 0) return;
      this.selectItem({ isChecked: !checked, id });
    },
    selectItem({ isChecked, id }) {
      let ids = [...this.value];
      if (!isChecked) {
        ids = ids.filter(itemId => itemId !== id);
      } else ids.push(id);
      this.$emit("change", ids);
    },
    selectAllItems({ isChecked, ids }) {
      if (!isChecked) ids = [];
      this.$emit("change", ids);
    },
    unselectAll() {
      this.selectAllItems(false);
    },
    unselectItem(id) {
      this.selectItem({ isChecked: false, id });
    }
  },
  computed: {
    matchedItems() {
      return this.items.map(item => {
        const newItem = { ...item };
        const isChecked = this.value.includes(item.id);
        newItem.checked = isChecked;
        return newItem;
      });
    },
    itemsById() {
      return this.items.reduce((accum, item) => {
        accum[item.id] = item.name;
        return accum;
      }, {});
    },
    activeItemIndex() {
      return this.arrowCounter;
    },
    amountCheckedItems() {
      return this.value.length;
    },
    multiselectIds() {
      return this.items.reduce((accum, item) => {
        accum.push(item.id);
        return accum;
      }, []);
    }
  }
};
</script>

<style lang="scss" module>
@import "~@/styles/_variables";
@import "~@/styles/_mixins";

.wrapper {
  position: relative;
  outline: none;
  z-index: 1;
}

.multiselect {
  position: relative;
  width: 100%;
  min-height: 40px;
  border: 1px solid $bgDisable;
  background: $white;
  border-radius: $radius;
  max-height: 114px;
  overflow: hidden;

  &:hover,
  &:focus {
    border-color: $green30;
  }

  &:focus,
  &:active {
    box-shadow: 0px 0px 4px $green60;
    outline: none;
  }

  &Focus {
    box-shadow: 0px 0px 4px $green60;
    border-color: $green30;
  }
}

.inner {
  @include flex(space-between);
  padding: 4px;
}

.arrow {
  transition: 0.2s transform linear;
  @include size(30px);
  @include flex(center, center);

  &Active {
    transform: rotate(180deg);
  }
}

.text {
  font-size: 16px;
  color: $grey30;
  margin-top: 7px;
  margin-left: 4px;

  &Active {
    font-weight: 600;
    color: $text;
  }
}

.dropdown {
  position: absolute;
  top: 100%;
  margin-top: 5px;
}

.counter {
  position: relative;
  margin-right: 10px;
  margin-top: 5px;
}

.chips {
  @include flex;
  flex-wrap: wrap;
  gap: 4px 11px;
}

.controls {
  @include flex;
  margin-left: 16px;
  position: relative;
  top: 0;
}

.error {
  border-color: $errorText;

  &:focus,
  &:hover {
    box-shadow: none;
    border-color: $errorText;
  }
}
</style>
