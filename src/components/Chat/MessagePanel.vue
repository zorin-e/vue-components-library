<template>
  <form
    :class="$style.panel"
    class="flex align align--v-center"
    @submit.prevent="sendMessage"
  >
    <textarea-auto-resizable
      ref="textarea"
      wide
      v-model="message"
      size="xs"
      @keypress.enter="onEnter"
      placeholder="Напишите сообщение..."
    />
    <base-button
      type="submit"
      size="xs"
      class="ml-10"
      :disabled="!isMessage || isLoading"
      :is-loading="isLoading"
      >Отправить</base-button
    >
  </form>
</template>

<script>
import { Button as BaseButton, TextareaAutoResizable } from "@/";
export default {
  name: "MessagePanel",
  props: {
    isLoading: Boolean
  },
  components: {
    BaseButton,
    TextareaAutoResizable
  },
  data() {
    return {
      message: ""
    };
  },
  computed: {
    isMessage() {
      return this.message.trim().length > 0;
    }
  },
  methods: {
    sendMessage() {
      if (!this.isMessage || this.isLoading) return;
      this.$emit("sendMessage", { message: this.message });
      this.clearMessage();
    },
    clearMessage() {
      this.message = "";
      this.$refs.textarea.$el.innerText = "";
    },
    onEnter(event) {
      if (!event.shiftKey) {
        this.sendMessage();
        event.preventDefault();
      }
    }
  }
};
</script>

<style lang="scss" module>
@import "~@/styles/_variables";

.panel {
  padding: 6px 15px;
  background: $white;
}
</style>
