import { shallowMount } from "@vue/test-utils";
import { Container } from "@/";
import CssModuleTestMixin from "@tests/infrastructure/CssModuleTestMixin";

new CssModuleTestMixin();

const props = [
  { name: "fillHeight", className: "fill-height" },
  { name: "alignH", className: "align-h-center" },
  { name: "alignV", className: "align-v-center" }
];

describe("Container.vue", () => {
  it("renders text slot", () => {
    const text = "new message";
    const wrapper = shallowMount(Container, {
      slots: {
        default: text
      }
    });
    expect(wrapper.text()).toMatch(text);
  });

  props.forEach(item => {
    it(`component prop ${item.name} should be false by default`, () => {
      const wrapper = shallowMount(Container, {
        propsData: {
          [item.name]: false
        }
      });
      expect(wrapper.props()[item.name]).toBe(false);
    });
  });

  props.forEach(item => {
    it(`component prop ${item.name} should be true`, () => {
      const wrapper = shallowMount(Container, {
        propsData: {
          [item.name]: true
        }
      });
      expect(wrapper.props()[item.name]).toBe(true);
    });
    it(`className should be ${item.className}`, () => {
      const wrapper = shallowMount(Container, {
        propsData: {
          [item.name]: true
        }
      });
      expect(wrapper.classes(item.className)).toBe(true);
    });
  });
});
