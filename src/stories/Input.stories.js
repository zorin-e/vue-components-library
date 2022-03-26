import BaseInput from "@/components/Input/Input.vue";

export default {
  title: "Input",
  component: BaseInput,
  argTypes: {
    size: { control: { type: "select", options: ["l", "m", "s"] } }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseInput },
  template: '<base-input v-bind="$props" > </base-input>'
});

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  size: "s"
};
