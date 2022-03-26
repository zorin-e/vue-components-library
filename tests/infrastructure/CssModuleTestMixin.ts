import Vue from "vue";
import identityObjProxy from "identity-obj-proxy";

const CssModuleTestMixin = Vue.use({
  install(Vue: any) {
    Vue.mixin({
      created() {
        this.$style = identityObjProxy;
      }
    });
  }
});

export default CssModuleTestMixin;
