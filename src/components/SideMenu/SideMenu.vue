<template>
  <block :class="$style['side-menu']">
    <ul>
      <li v-for="(item, index) in menu" :key="index">
        <router-link
          :to="{ name: item.name }"
          :class="$style['side-menu__link']"
        >
          {{ item.title }}
        </router-link>
      </li>
    </ul>
  </block>
</template>

<script>
import { Block } from "@/";

export default {
  name: "SideMenu",
  components: {
    Block
  },
  props: {
    menu: {
      type: Array,
      default: () => [],
      validator: value => {
        return value.length !== 0;
      }
    }
  }
};
</script>

<style lang="scss" module>
.side-menu {
  flex-shrink: 0;
  width: 250px;

  &__link {
    padding: 10px;
    display: block;
    font-size: 16px;
  }
}
</style>
