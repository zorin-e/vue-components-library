<template>
  <div :class="$style.radioToggle">
    <div v-for="(item, index) in items" :key="index" :class="$style.wrapper">
      <input
        :id="$options.radioName + index"
        type="radio"
        :name="$options.radioName"
        :value="item.value"
        @change="event => (localValue = event.target.value)"
        :checked="value ? value === item.value : index === 0 ? true : false"
      />
      <label :for="$options.radioName + index">{{ item.name }}</label>
    </div>
  </div>
</template>

<script>
import { getRandomId } from "@/infrastructure/getRandomId";

export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    value: {
      default: ""
    }
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("change", value);
      }
    }
  },
  created() {
    this.$options.radioName = getRandomId("RadioToggle");
  }
};
</script>

<style lang="scss" module>
.wrapper {
  width: 100%;
}
.radioToggle {
  display: flex;
  align-items: center;
  padding: 4px;
  height: 40px;
  background: #f7f7f9;
  border: 1px solid #bfbfbf;
  border-radius: 8px;

  input {
    display: none;

    &:checked {
      & + label {
        background: #4da32e;
        border-radius: 4px;
        color: #fff;
        border: 1px solid #428b26;
      }
    }
  }

  label {
    color: #545454;
    height: 32px;
    font-size: 16px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
}
</style>
