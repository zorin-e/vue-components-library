import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Multiselect/Counter";
import CssModuleTestMixin from "@tests/infrastructure/CssModuleTestMixin";

new CssModuleTestMixin();

const factory = props => {
  return shallowMount(Counter, {
    stubs: {
      CounterClose: "<div/>"
    },
    propsData: {
      ...props
    }
  });
};

describe("Counter.vue", () => {
  it("should be rendered", () => {
    const wrapper = factory();
    expect(wrapper.find(".counter").exists()).toBe(true);
  });
  it('event "unselectAll" should be emitted', () => {
    const wrapper = factory();
    wrapper.find(".counter").trigger("click");
    expect(wrapper.emitted("unselectAll")).toBeTruthy();
  });
  it("amount should be equal to 10", () => {
    const wrapper = factory({
      amount: 10
    });
    expect(wrapper.find(".amount").text()).toMatch("10");
  });
});
