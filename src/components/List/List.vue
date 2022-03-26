<template>
  <div :class="$style.list">
    <div v-for="(item, index) in items" :key="index" :class="$style.list__item">
      <div
        v-for="(field, index) in fields"
        :key="index"
        :class="$style.list__item__cell"
        :style="cellStyles(field)"
        @click="$emit('click', item)"
      >
        <slot :name="field.name" v-bind:item="item">
          {{ item[field.name] }}
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    cellStyles(field) {
      return field.width ? `flex: 0; width: ${field.width}px;` : ``;
    }
  }
};
</script>
<style lang="scss" module>
@import "~@/styles/_variables";

.list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
    background: #f7f7f9;
    border-radius: 8px;
    margin-bottom: 16px;
    font-size: 16px;
    line-height: 24px;
    color: #000;
    cursor: pointer;
    transition: 0.3s box-shadow;
    background-size: 400% 400%;

    &:hover:not(:active) {
      background: $green80;
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.4),
        0px 6px 12px rgba(0, 0, 0, 0.1);
    }
    &:active {
      background: $green80;
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.4), 0px 4px 4px rgba(0, 0, 0, 0.1);
    }

    &__cell {
      flex: 1;
      margin: 0 8px;
      align-self: center;
      // justify-content: flex-start;
      // flex-shrink: 1;
    }
  }
}

@keyframes fadeToFade {
  0% {
    background-position: 0% 50%;
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.4);
  }
  50% {
    background-position: 100% 50%;
    box-shadow: 0px 5px 10px 1px rgba(0, 0, 0, 0.4);
  }
  100% {
    background-position: 0% 50%;
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.4);
  }
}
</style>
