<template>
  <div>
    <div :class="[$style.stepper, isDisabled && $style.disabled]">
      <step
        v-for="(item, index) in items"
        :key="item.name"
        :title="item.title"
        :isActive="index === activeTab"
        @click="changeStep(index)"
        v-show="!item.isHidden"
        :isError="item.isError"
        :isFinish="index === itemsAmount"
      />
    </div>
    <slot :name="items[activeTab].slot" />
  </div>
</template>

<script>
import Step from "./Step";

export default {
  model: {
    prop: "activeTab",
    event: "change"
  },
  props: {
    activeTab: {
      type: Number,
      default: 0
    },
    items: {
      type: Array,
      required: true
    },
    isDisabled: Boolean
  },
  components: {
    Step
  },
  methods: {
    changeStep(index) {
      this.$emit("change", index);
    }
  },
  computed: {
    itemsAmount() {
      return this.items.length - 1;
    }
  }
};
</script>

<style module>
.stepper {
  display: flex;
  flex-wrap: wrap;
}

.disabled {
  pointer-events: none;
}
</style>
