import { mount, createLocalVue } from "@vue/test-utils";
import { Autocomplete, Input as BaseInput } from "@/";
import CssModuleTestMixin from "@tests/infrastructure/CssModuleTestMixin";

const localVue = createLocalVue();
localVue.directive("mask", {});

new CssModuleTestMixin();

const items = [
  {
    _displayedValue: "google company",
    _selectedValue: "google",
    id: 144
  },
  { _displayedValue: "apple juice", _selectedValue: "apple", id: 12 },
  { _displayedValue: "amazon company", _selectedValue: "amazon", id: 16 }
];
const google = items[0]._selectedValue;
const googleDisplayedValue = items[0]._displayedValue;

const factory = props => {
  return mount(Autocomplete, {
    propsData: {
      items: [...items],
      ...props
    },
    components: {
      BaseInput
    },
    localVue
  });
};

describe("Autocomplete.vue", () => {
  it("input should be exists", () => {
    const wrapper = mount(Autocomplete, { localVue });
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it(`items prop should be equal ${items}`, () => {
    const wrapper = factory();
    expect(wrapper.vm.items).toEqual(items);
  });

  it(`items should be rendered`, async () => {
    const wrapper = factory();
    await wrapper.find("input").setValue("a");
    expect(wrapper.find(".list").exists()).toBe(true);
  });

  it(`list should be equal ${googleDisplayedValue}`, async () => {
    const wrapper = factory({ filter: true });
    await wrapper.find("input").setValue(google);
    expect(wrapper.find(".list").text()).toEqual(googleDisplayedValue);
  });

  it(`search word should be equal ${google} after select`, async () => {
    const wrapper = factory();
    await wrapper.find("input").setValue("goo");
    wrapper
      .findAll(".list .item")
      .at(0)
      .trigger("click");
    expect(wrapper.vm.search).toEqual(google);
  });

  it(`amountCounter should be equal -1 after select`, async () => {
    const wrapper = factory();
    await wrapper.find("input").setValue("goo");
    wrapper
      .findAll(".list .item")
      .at(0)
      .trigger("click");
    expect(wrapper.vm.arrowCounter).toEqual(-1);
  });
});
