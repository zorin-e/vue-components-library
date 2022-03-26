<template>
  <div :class="toastClasses" v-on="$listeners">
    <div v-if="!isDefaultColor" :class="$style.col">
      <div :class="$style.icon">
        <Attention v-if="color != 'success'" />
        <Success v-if="color == 'success'" />
      </div>
    </div>
    <div :class="$style.col">
      <div :class="$style.row">
        <heading size="xs"> {{ title }} </heading>
        <div :class="$style.close" @click="$emit('close')">
          <close />
        </div>
      </div>
      <div :class="$style.row">
        <div :class="$style.text">
          {{ text }}
        </div>
      </div>
      <div v-if="okText" :class="$style.action">
        <Button
          :disabled="buttonsDisabled"
          :title="cancelText"
          size="s"
          color="secondary"
          @click="$emit('click:cancel')"
        />
        <Button
          :disabled="buttonsDisabled"
          :title="okText"
          size="s"
          @click="$emit('click:ok')"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Close from "./close.svg";
import Attention from "./attention.svg";
import Success from "./success.svg";

const defaultColor = "plain";

export default {
  components: { Heading, Close, Button, Attention, Success },
  props: {
    title: {
      type: String
    },
    text: {
      type: String
    },
    color: {
      type: String,
      default: defaultColor,
      validator: function(value) {
        return ["plain", "warning", "info", "success"].includes(value);
      }
    },
    okText: {
      type: String,
      default: ""
    },
    cancelText: {
      type: String,
      default: ""
    },
    buttonsDisabled: Boolean
  },
  computed: {
    toastClasses() {
      return [
        this.$style.toast,
        this.color == "warning" ? this.$style.warning : "",
        this.color == "info" ? this.$style.info : "",
        this.color == "success" ? this.$style.success : "",
        this.isDefaultColor && this.$style.withoutIcon
      ];
    },
    isDefaultColor() {
      return this.color === defaultColor;
    }
  }
};
</script>
<style lang="scss" module>
@import "~@/styles/_variables";

.toast {
  display: flex;
  justify-content: space-between;
  background: $white;
  padding: 16px;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.1), 0px 0px 1px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  max-width: 400px;
  line-height: 20px;
  outline: none;

  &.warning {
    border-top: solid 3px #ff6600;
  }
  &.info {
    border-top: solid 3px #1b82e3;
  }
  &.success {
    border-top: solid 3px #428b26;
  }
}
.row {
  display: flex;
  justify-content: space-between;
}

.text {
  font-size: 14px;
  color: $darkGrey;
  margin-top: 8px;
}

.close {
  cursor: pointer;
}

.action {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  button:first-child {
    margin-right: 8px;
  }
}

.withoutIcon {
  max-width: 360px;
}

.icon {
  margin-right: 16px;
  .warning & {
    fill: #ff6600;
  }
  .info & {
    fill: #1b82e3;
  }
  .success & {
    fill: #428b26;
  }
}
</style>
