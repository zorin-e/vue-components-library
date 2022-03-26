<template>
  <block>
    <div :class="$style.header">
      <helper-icon :class="$style.icon" />
      <heading size="md">{{ title }}</heading>
    </div>
    <div :class="$style.hr"></div>
    <div :class="$style.text">
      <slot />
    </div>
  </block>
</template>
<script>
import Block from "@/components/NewBlock";
import Heading from "@/components/Heading";
import HelperIcon from "./helper.svg";

export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  components: {
    Block,
    Heading,
    HelperIcon
  }
};
</script>

<style module lang="scss">
@import "@/styles/_mixins";

.hr {
  height: 1px;
  background: #eeeeee;
  margin-top: 16px;
}

.text {
  line-height: 24px;
  font-size: 16px;
  margin-top: 16px;
}

.header {
  @include flex(null, center);
}

.icon {
  margin-right: 10px;
}
</style>
