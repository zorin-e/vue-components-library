import Select from "@/components/Select/Select.vue";

export default {
  title: "Select",
  component: Select,
  argTypes: {
    size: { control: { type: "select", options: ["l", "m", "s"] } }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Select },
  template: '<Select v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  size: "s"
};
