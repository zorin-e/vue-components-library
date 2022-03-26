import { shallowMount } from "@vue/test-utils";
import { Block } from "@/";
import CssModuleTestMixin from "@tests/infrastructure/CssModuleTestMixin";

const [primary, transparent, wide] = ["primary", "transparent", "wide"];

new CssModuleTestMixin();

describe("Block.vue", () => {
  it("renders text slot", () => {
    const text = "new message";
    const wrapper = shallowMount(Block, {
      slots: {
        default: text
      }
    });
    expect(wrapper.text()).toMatch(text);
  });
  it(`component should be '${wide}'`, () => {
    const wrapper = shallowMount(Block, {
      propsData: {
        wide: true
      }
    });
    expect(wrapper.classes(wide)).toBe(true);
  });
  it(`component should be '${primary}'`, () => {
    const wrapper = shallowMount(Block);
    expect(wrapper.classes(`block--${primary}`)).toBe(true);
  });
  it(`component should not be '${wide}'`, () => {
    const wrapper = shallowMount(Block);
    expect(wrapper.classes(wide)).toBe(false);
  });
  it(`component type should be '${transparent}'`, () => {
    const wrapper = shallowMount(Block, {
      propsData: {
        type: "transparent"
      }
    });
    expect(wrapper.props().type).toBe(transparent);
  });
});
