import { ComponentMeta, ComponentStory } from "@storybook/react";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import { action } from "@storybook/addon-actions";
import { CommentCard } from "./CommentCard";

export default {
  title: "entities/Comment/CommentCard",
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  comment: {
    id: "1",
    text: "comment",
    user: {
      id: "1",
      username: "user",
      avatar: "https://t3.ftcdn.net/jpg/05/17/16/90/360_F_517169024_GfRSDlJPnQUydJBhRHTnOSOqgnTHHKYl.jpg",
    },
    userId: "1",
    articleId: "1",
  },
};

Normal.decorators = [StoreDecorator({})];

export const LoadingCard = Template.bind({});
LoadingCard.args = {
  isLoading: true,
};

LoadingCard.decorators = [StoreDecorator({})];
