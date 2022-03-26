import { shallowMount } from "@vue/test-utils";
import { Multiselect } from "@/";
import CssModuleTestMixin from "@tests/infrastructure/CssModuleTestMixin";

new CssModuleTestMixin();

describe("Multiselect.vue", () => {
  it("should be rendered", () => {
    const wrapper = shallowMount(Multiselect, {
      stubs: {
        ArrowDown: "<div></div>"
      },
      propsData: {
        items: []
      }
    });
    expect(wrapper.find(".multiselect").exists()).toBe(true);
  });
});
