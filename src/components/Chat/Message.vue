<template>
  <div :class="['message', isMessageIn ? 'message--in' : 'message--out']">
    <div
      :class="[
        $style.message,
        isMessageIn ? $style.messageIn : $style.messageOut
      ]"
    >
      <slot />
      <chat-time v-if="time" :time="time" />
    </div>
  </div>
</template>

<script>
import ChatTime from "./Time";
export default {
  name: "Message",
  props: {
    isMessageIn: Boolean,
    time: {
      type: String,
      default: ""
    }
  },
  components: {
    ChatTime
  }
};
</script>

<style lang="scss" module>
@import "~@/styles/_variables";
@import "~@/styles/_mixins";

.message {
  border-radius: $radius * 2;
  padding: 15px 22px;
  max-width: 548px;
  position: relative;
  line-height: 1.8;

  &In {
    background: $messageIn;
    margin-left: 7%;
  }
  &Out {
    background: $messageOut;
    margin-right: 7%;
  }
}
</style>
