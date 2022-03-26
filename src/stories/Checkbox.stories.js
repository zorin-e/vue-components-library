import Checkbox from "@/components/Checkbox/Checkbox.vue";

export default {
  title: "Checkbox",
  component: Checkbox,
  argTypes: {
    // size: { control: { type: "select", options: ["l", "m", "s"] } },
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Checkbox },
  template: '<Checkbox v-bind="$props" > </Checkbox>'
});

export const Default = Template.bind({});
Default.args = {
  label: "Body"
};
