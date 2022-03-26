<template>
  <div :class="[$style.file_upload, !wide && $style.fix]">
    <div :class="$style.wrapper" @click="handler">
      <div :class="$style.icon_wrapper">
        <component :is="icon" />
      </div>
      <div :class="$style.stete_label">выберите</div>
    </div>
    <div :class="$style.stete_text">
      {{ text }}
    </div>
    <input type="file" ref="fileInput" />
  </div>
</template>
<script>
import IconPlus from "./assets/icon_plus.svg";
import IconAlert from "./assets/icon_alert.svg";
import IconRefresh from "./assets/icon_refresh.svg";
import IconRemove from "./assets/icon_remove.svg";
import IconSuccess from "./assets/icon_success.svg";
import IconUpload from "./assets/icon_upload.svg";

const STATE_DEFAULT = "default";
const STATE_ALERT = "alert";
const STATE_REFRESH = "refresh";
const STATE_REMOVE = "remove";
const STATE_SUCCESS = "success";
const STATE_UPLOAD = "upload";

const STATES_MAP = {
  default: "IconPlus",
  alert: "IconAlert",
  refresh: "IconRefresh",
  remove: "IconRemove",
  success: "IconSuccess",
  upload: "IconUpload"
};

export default {
  props: {
    wide: Boolean,
    text: {
      type: String,
      default: "или перетащите файл в формате pdf, png или jpg"
    }
  },
  components: {
    IconPlus,
    IconAlert,
    IconRefresh,
    IconRemove,
    IconSuccess,
    IconUpload
  },
  computed: {
    icon() {
      return STATES_MAP[this.state];
    }
  },
  data() {
    return {
      state: STATE_DEFAULT
    };
  },
  methods: {
    handler() {
      console.log("sdsd");
      this.$refs.fileInput.click();
    }
  }
};
</script>
<style lang="scss" module>
@import "~@/styles/_variables";
@import "~@/styles/_mixins";

.file_upload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;

  input {
    display: none;
  }

  .icon_wrapper {
    width: 32px;
    height: 32px;
  }

  .stete_label {
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    color: $green30;
    margin: 8px 0 12px 0;
  }

  .stete_text {
    font-size: 14px;
    line-height: 20px;
    color: $grey60;
  }

  @include fileUploader($greysLightGrey, dashed, $bgDisable);
  height: 160px;
  padding: 16px;

  &:hover {
    @include fileUploader($green80, solid, $green30);
  }

  &_in_progress {
    @include fileUploader($greysLightGrey, solid, $bgDisable);
  }
  &_success {
    @include fileUploader($green80, solid, $green30);
  }
  &_warning {
    @include fileUploader($warning, dashed, $warningText);
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fix {
  width: 210px;
}
</style>
