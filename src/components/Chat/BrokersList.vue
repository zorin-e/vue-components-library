<template>
  <div :class="[$style.list, fillHeight && $style.fillHeight]">
    <ul>
      <li
        v-for="(broker, index) in brokers"
        :key="broker.id"
        :class="[
          $style.item,
          isActive(broker.id) && $style.itemActive,
          index > 0 && $style.border
        ]"
        @click="selectChat({ id: broker.id })"
      >
        {{ broker.name }}
        <counter
          v-if="broker.notificationsAmount"
          :amount="broker.notificationsAmount"
          class="ml-10"
        ></counter>
      </li>
    </ul>
  </div>
</template>

<script>
import Counter from "./Counter";
export default {
  name: "BrokersList",
  props: {
    brokers: {
      type: Array,
      default: () => []
    },
    currentPage: {
      type: String,
      default: ""
    },
    fillHeight: Boolean
  },
  components: {
    Counter
  },
  methods: {
    isActive(id) {
      return this.currentPage.includes(id);
    },
    selectChat({ id }) {
      this.$emit("selectChat", { id });
    }
  }
};
</script>

<style lang="scss" module>
@import "~@/styles/_mixins";
@import "~@/styles/_variables";

.list {
  border-right: solid 1px $grey10;
}

.item {
  padding: 21px 16px;
  cursor: pointer;
  background: $white;
  font-size: $fieldFontSizeMd;
  font-weight: 600;
  @include flex(space-between, center);

  &:hover:not(.itemActive) {
    background: $bg;
  }

  &Active {
    cursor: default;
    background: $green80;
  }
}

.border {
  border-top: solid 1px $grey10;
}

.fillHeight {
  max-height: calc(100vh - 170px);
  min-height: calc(100vh - 170px);
  overflow-y: auto;
}
</style>
