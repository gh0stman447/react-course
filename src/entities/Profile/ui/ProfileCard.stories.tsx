import { ComponentMeta, ComponentStory } from "@storybook/react";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import { Country } from "entities/Country";
import { Currency } from "entities/Currnecy";
import avatar from "shared/assets/tests/storybook.jpg";
import { ProfileCard } from "./ProfileCard";

export default {
  title: "entities/ProfileCard",
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  data: {
    age: 22,
    username: "User",
    first: "Oleg",
    lastname: "Malygin",
    country: Country.Russia,
    currency: Currency.RUB,
    avatar,
  },
};

export const withError = Template.bind({});

withError.args = {
  error: "true",
};

export const isLoading = Template.bind({});

isLoading.args = {
  isLoading: true,
};
