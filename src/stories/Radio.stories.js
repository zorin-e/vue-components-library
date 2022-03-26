import Radio from "@/components/Radio/Radio.vue";

export default {
  title: "Radio",
  component: Radio,
  argTypes: {
    size: { control: { type: "select", options: ["l", "m", "s"] } }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Radio },
  template: '<Radio v-bind="$props" > </Radio>'
});

export const Default = Template.bind({});
Default.args = {
  label: "Radio",
  size: "s"
};
