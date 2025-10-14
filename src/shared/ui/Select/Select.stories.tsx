import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Select } from "./Select";

export default {
  title: "shared/Select",
  component: Select,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Текст",
  options: [
    { value: "123", content: "Первый" },
    { value: "456", content: "Второй" },
  ],
};
