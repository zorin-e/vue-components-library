<template>
  <div :class="$style.wrapper">
    Показано {{ showed }} из {{ totalItems }} записей
    <base-select
      :class="['ml-15', $style.manage]"
      :value="pageSize"
      :items="items"
      size="s"
      displayExpr="size"
      valueExpr="size"
      @input="setPage"
    />
  </div>
</template>

<script>
import BaseSelect from "@/components/Select";

export default {
  components: {
    BaseSelect
  },
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    startIndex: {
      type: Number,
      required: true
    },
    endIndex: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    }
  },
  data() {
    const { totalItems, pageSize } = this;
    return {
      items: [
        ...Array.from({ length: totalItems / pageSize }, (_, i) => ({
          size: (i + 1) * pageSize
        }))
      ]
    };
  },
  computed: {
    showed() {
      const { startIndex, endIndex } = this;
      return `${startIndex + 1} - ${endIndex + 1}`;
    }
  },
  methods: {
    setPage(pageSize) {
      this.$emit("change:pageSize", pageSize);
    }
  }
};
</script>

<style module>
.wrapper {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.manage {
  width: 80px;
}
</style>
