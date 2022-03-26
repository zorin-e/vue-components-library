import { shallowMount } from "@vue/test-utils";
import { Input as BaseInput } from "@/";
import CssModuleTestMixin from "@tests/infrastructure/CssModuleTestMixin";

const wide = "wide";

new CssModuleTestMixin();

const factory = props => {
  return shallowMount(BaseInput, {
    stubs: {
      ShowIcon: "<div class='show-icon'></div>",
      HideIcon: "<div class='hide-icon'></div>"
    },
    propsData: {
      ...props
    }
  });
};

describe("Input.vue", () => {
  it("component type should be password", () => {
    const wrapper = factory({
      type: "password"
    });
    expect(wrapper.find("input").attributes("type")).toMatch("password");
  });
  it("component type password should show pass", async () => {
    const wrapper = factory({
      type: "password"
    });
    await wrapper.find(".pass-icon").trigger("click");
    expect(wrapper.find("input").attributes("type")).toMatch("text");
  });
  it("component type password should type password after show", async () => {
    const wrapper = factory({
      type: "password"
    });
    await wrapper.find(".pass-icon").trigger("click");
    await wrapper.find(".pass-icon").trigger("click");
    expect(wrapper.find("input").attributes("type")).toMatch("password");
  });
  it(`component should be '${wide}'`, () => {
    const wrapper = factory({
      wide: true
    });
    expect(wrapper.classes(wide)).toBe(true);
  });
  it(`component should not be '${wide}'`, () => {
    const wrapper = factory();
    expect(wrapper.classes(wide)).toBe(false);
  });
});
