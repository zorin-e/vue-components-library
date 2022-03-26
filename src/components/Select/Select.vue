<template>
  <div>
    <div v-if="title" :class="[$style['output-text-title']]">
      {{ title }}
    </div>

    <div
      tabindex="1"
      @keyup.escape="onEscape"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
      :class="[$style.select]"
      v-click-outside="hide"
    >
      <div
        :class="[
          $style.output,
          isOpen && $style.output_open,
          isError && $style.error,
          $style[`output_${size}`],
          disabled ? $style['disabled'] : '',
          $style.wrapper
        ]"
        @click="withInput ? null : toggle()"
      >
        <Input
          v-if="withInput"
          without-styles
          wide
          :placeholder="placeholder"
          v-model="fakeValue"
          @click="isOpen = true"
          ref="input"
          :class="$style.input"
        />
        <template v-else>
          <div
            :class="[$style['output-text-placeholder']]"
            v-if="!displayValue"
          >
            {{ placeholder }}
          </div>
          <div :class="$style['output-text']">
            <div
              :class="$style['output-text-value']"
              v-if="displayValue || $slots.input"
            >
              <slot name="input">
                {{ displayValue }}
              </slot>
            </div>
          </div>
        </template>
        <div
          @click="withInput ? toggle() : null"
          :class="[$style['output-controls'], $style.outputWrapper]"
        >
          <div
            :class="[
              $style['output-controls-item'],
              isOpen && $style['output-controls-item_open']
            ]"
          >
            <slot name="arrow">
              <arrow-down />
            </slot>
          </div>
        </div>
      </div>
      <div :class="[$style.items, isOpen && $style.items_open]">
        <virtual-list
          :items="filteredItems"
          v-if="filteredItemsCount"
          :fake-items-count="~~isDefaultItem"
        >
          <template #default="{ items }">
            <select-item
              v-if="isDefaultItem"
              :title="defaultItem.title"
              @click="selectValue(defaultItem)"
            />
            <select-item
              v-for="(item, index) in items"
              :key="index"
              :title="item[displayExpr]"
              :isActive="index === arrowCounter"
              @click="selectValue(item)"
            />
          </template>
        </virtual-list>
      </div>
    </div>
  </div>
</template>
<script>
import SelectItem from "./SelectItem";
import ClickOutside from "@/directives/clickOutside.js";
import ArrowDown from "./assets/arrow-down.svg";
import VirtualList from "@/components/VirtualList";
import Input from "@/components/Input";
import debounce from "lodash/debounce";

export default {
  name: "Select",
  components: { SelectItem, ArrowDown, VirtualList, Input },
  directives: {
    ClickOutside
  },
  props: {
    value: [String, Boolean, Number],
    items: {
      type: Array,
      default: () => []
    },
    title: {
      type: [String, Number],
      default: ""
    },
    placeholder: {
      type: String,
      default: "Выберите"
    },
    displayExpr: {
      type: [String, Number],
      default: "title"
    },
    valueExpr: {
      type: [String, Number],
      default: "value"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "s",
      validator: value => ["l", "m", "s"].includes(value)
    },
    isError: Boolean,
    isDefaultItem: Boolean,
    withInput: Boolean
  },
  data() {
    return {
      isOpen: false,
      arrowCounter: -1,
      filteredItems: [],
      fakeValue: ""
    };
  },
  watch: {
    isOpen(value) {
      if (value) return;
      this.arrowCounter = -1;
      if (!this.withInput) return;
      this.$refs.input.blur();
      if (this.fakeValue === "") return;
      if (this.displayValue === this.fakeValue) return;
      this.$nextTick(() => this.updateState());
    },
    fakeValue(value) {
      if (!this.withInput) return;
      this.debounceSearchItems({ value });
    },
    items() {
      this.initItems();
    }
  },
  computed: {
    displayValue() {
      if (!this.value) return "";
      const _val = this.items.find(item => item[this.valueExpr] === this.value);
      return _val ? _val[this.displayExpr] : "";
    },
    defaultItem() {
      return { [this.valueExpr]: "", title: "Не выбрано" };
    },
    filteredItemsCount() {
      return this.filteredItems.length;
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    setFakeValueEquilValue() {
      this.fakeValue = this.displayValue;
    },
    selectValue(item) {
      this.$emit("input", item[this.valueExpr]);
      this.hide();

      if (this.withInput) {
        this.$nextTick(() => {
          this.setFakeValueEquilValue();
        });
      }
    },
    hide() {
      this.isOpen = false;
    },
    onEscape() {
      this.hide();
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
    onEnter() {
      if (this.arrowCounter < 0) return;
      this.selectValue(this.items[this.arrowCounter]);
    },
    initItems() {
      this.filteredItems = [...this.items];
      if (this.withInput) {
        this.setFakeValueEquilValue();
      }
    },
    init() {
      this.initItems();
      if (this.withInput) {
        this.debounceSearchItems = debounce(this.searchItems, 200);
      }
    },
    searchItemAmongFiltered({ value }) {
      const search = value.toLowerCase();
      return this.filteredItems.find(item =>
        item[this.displayExpr].toLowerCase().includes(search)
      );
    },
    searchItems({ value }) {
      const search = value.toLowerCase();
      this.filteredItems = this.items.filter(item => {
        const isMatched = item[this.displayExpr].toLowerCase().includes(search);
        if (isMatched) return item;
        return "";
      });
    },
    updateState() {
      let searched = "",
        selectedValue = "",
        selectedTitle = "";
      if (this.fakeValue)
        searched = this.searchItemAmongFiltered({ value: this.fakeValue });

      if (searched) {
        selectedValue = searched[this.valueExpr];
        selectedTitle = searched[this.displayExpr];
      }

      this.$emit("input", selectedValue);
      this.fakeValue = selectedTitle;
    }
  },
  created() {
    this.init();
  }
};
</script>
<style lang="scss" module>
@import "~@/styles/_variables";
@import "~@/styles/_variables";
.select {
  position: relative;
  width: 100%;
  outline: none;

  svg {
    stroke: currentColor;
  }
}
.output {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px;
  background: $white;
  border: 1px solid $bgDisable;
  box-sizing: border-box;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s box-shadow;
  color: $green30;

  &_s {
    height: 40px;
  }
  &_m {
    height: 48px;
  }
  &_l {
    height: 56px;
  }

  &.disabled {
    pointer-events: none;
    background: $grey20;
  }

  &_open {
    border: solid 1px $green30;
    box-shadow: 0px 0px 4px $green60;
  }

  &:focus {
    border: solid 1px $green30;
    box-shadow: 0px 0px 4px $green60;
  }
  &:hover {
    border: solid 1px $green30;
  }
  &-text {
    position: relative;
    width: 100%;

    &-placeholder {
      color: $grey;
      width: 100%;
      font-size: 16px;
      line-height: 24px;
      color: $grey30;
    }

    &-title {
      margin-bottom: 4px;
      font-size: 16px;
      line-height: 19px;
      color: $grey;
      &_value {
        font-size: 10px;
        line-height: 12px;
      }
    }
    &-value {
      font-size: 16px;
      line-height: 19px;
      color: $title;
    }
  }

  &-controls {
    &-item {
      transition: 0.6s transform;
      &_open {
        transform: rotate3d(1, 0, 0, 190deg);
      }
    }
  }
}

.items {
  overflow: auto;
  position: absolute;
  background: $white;
  display: flex;
  flex-direction: column;
  margin: 8px 0 0 0;
  width: 100%;
  border: 1px solid $block_border;
  padding: 4px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 0px 1px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  max-height: 0;
  opacity: 0;
  transition: 0.4s opacity, 0.4s max-height;
  z-index: 2;

  &_open {
    opacity: 1;
    max-height: 250px;
  }
}

.error {
  border-color: $errorText;
}

.input {
  position: absolute;
  left: 0;
}

.outputWrapper {
  position: absolute;
  right: 15px;
  top: 11px;
}

.wrapper {
  overflow: hidden;
  position: relative;
}
</style>
