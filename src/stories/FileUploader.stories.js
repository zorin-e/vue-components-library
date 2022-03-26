import FileUploader from "@/components/FileUploader/FileUploader.vue";

export default {
  title: "File Uploader",
  component: FileUploader,
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FileUploader },
  template: '<FileUploader v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
  label: "Label"
};
