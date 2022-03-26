import BaseButton from "@/components/Button/Button.vue";
import HeartIcon from "./assets/heart.svg";
import ArrowRight from "./assets/arrow-right.svg";

export default {
  title: "Button",
  component: BaseButton,
  argTypes: {
    size: { control: { type: "select", options: ["l", "m", "s"] } },
    color: {
      control: { type: "select", options: ["primary", "secondary", "tertiary"] }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseButton },
  methods: {
    onClick() {
      alert("Click!");
    }
  },
  template: '<base-button @click="onClick" v-bind="$props" > </base-button>'
});

const LeftSideIconTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseButton, HeartIcon },
  methods: {
    onClick() {
      alert("Click!");
    }
  },
  template:
    '<base-button @click="onClick" v-bind="$props" > <template slot="left-icon"> <heart-icon /> </template> </base-button>'
});

const RightSideIconTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseButton, ArrowRight },
  methods: {
    onClick() {
      alert("Click!");
    }
  },
  template:
    '<base-button @click="onClick" v-bind="$props" > <template slot="right-icon"> <arrow-right /> </template> </base-button>'
});

export const Default = Template.bind({});
Default.args = {
  title: "Call o action",
  size: "s"
};

export const IconLeftSide = LeftSideIconTemplate.bind({});
IconLeftSide.args = {
  title: "Call o action",
  size: "s"
};

export const IconRightSide = RightSideIconTemplate.bind({});
IconLeftSide.args = {
  title: "Call o action",
  size: "s"
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   color: "secondary",
//   title: "Call o action",
//   size: 's'
// };

// export const Tertiary = Template.bind({});
// Tertiary.args = {
//   color: "tertiary",
//   title: "Call o action",
//   size: 's'
// };
