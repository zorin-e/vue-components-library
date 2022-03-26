import { shallowMount } from "@vue/test-utils";
import { Checkbox } from "@/";

const factory = (props = {}) => {
  return shallowMount(Checkbox, {
    stubs: {
      CheckIcon: "<div></div>"
    },
    propsData: {
      ...props.propsData
    },
    slots: {
      ...props.slots
    }
  });
};

describe("Checkbox.vue", () => {
  it("should be rendered", () => {
    const wrapper = factory();
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("input should not be disabled", () => {
    const wrapper = factory();
    expect(wrapper.find("input").attributes("disabled")).toBe(undefined);
  });

  it("input should be disabled", () => {
    const wrapper = factory({
      propsData: { disabled: true }
    });
    expect(wrapper.find("input").attributes("disabled")).toBe("disabled");
  });

  it("checkbox should be checked", async () => {
    const wrapper = factory();
    const checkbox = wrapper.find("input");
    checkbox.setChecked();
    expect(checkbox.element.checked).toBe(true);
  });

  it("checkbox should be checked by initial", async () => {
    const wrapper = factory({
      propsData: { checked: true }
    });
    const checkbox = wrapper.find("input");
    expect(checkbox.element.checked).toBe(true);
  });

  it("slot should be rendered", async () => {
    const text = "Checkbox slot";
    const slot = `<div class='text'>${text}</div>`;
    const wrapper = factory({
      slots: {
        default: slot
      }
    });
    const textEl = wrapper.find(".text");
    expect(textEl.text()).toMatch(text);
  });

  it("prop label should be equal Checkbox slot", async () => {
    const text = "Checkbox slot";
    const wrapper = factory({
      propsData: {
        label: text
      }
    });
    expect(wrapper.text()).toMatch(text);
  });
});
