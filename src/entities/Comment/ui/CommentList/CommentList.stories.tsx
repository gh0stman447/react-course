import { ComponentMeta, ComponentStory } from "@storybook/react";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import { action } from "@storybook/addon-actions";
import { CommentList } from "./CommentList";

const comments = [
  {
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
  {
    id: "2",
    text: "comment",
    user: {
      id: "2",
      username: "user2",
      avatar: "https://t3.ftcdn.net/jpg/05/17/16/90/360_F_517169024_GfRSDlJPnQUydJBhRHTnOSOqgnTHHKYl.jpg",
    },
    userId: "2",
    articleId: "2",
  },
];

export default {
  title: "entities/Comment/CommentList",
  component: CommentList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  comments,
};

Normal.decorators = [StoreDecorator({})];

export const LoadingList = Template.bind({});
LoadingList.args = {
  isLoading: true,
};

Normal.decorators = [StoreDecorator({})];

export const emptyList = Template.bind({});
emptyList.args = {
  comments: [],
};

Normal.decorators = [StoreDecorator({})];
