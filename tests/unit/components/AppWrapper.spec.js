import { shallowMount } from "@vue/test-utils";
import { AppWrapper } from "@/";
import CssModuleTestMixin from "@tests/infrastructure/CssModuleTestMixin";

new CssModuleTestMixin();

describe("AppWrapper.vue", () => {
  it("renders text slot", () => {
    const text = "new message";
    const wrapper = shallowMount(AppWrapper, {
      slots: {
        default: text
      }
    });
    expect(wrapper.text()).toMatch(text);
  });
});
