import Toast from "@/components/Toast/Toast.vue";

export default {
  title: "Toast",
  component: Toast,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["plain", "warning", "info", "success"]
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Toast },
  template: '<toast v-bind="$props" > </toast>'
});

export const Default = Template.bind({});
Default.args = {
  color: "paint",
  title: "Notification title",
  text:
    "Но чтобы вы поняли, откуда возникает это превратное представление людей, порицающих наслаждение и восхваляющих страдания, я раскрою перед вами всю картину и разъясню.",
  okText: "Call to action",
  cancelText: "Call to action"
};
