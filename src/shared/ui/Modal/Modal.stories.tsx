import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Modal } from './Modal';

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Normal = Template.bind({});

Normal.args = {
  isOpen: true,
  children: 'Text text text text text text text text text text text text text text text text text text text text ',
};

export const DarkModal = Template.bind({});

DarkModal.args = {
  isOpen: true,
  children: 'Text text text text text text text text text text text text text text text text text text text text ',
};

DarkModal.decorators = [ThemeDecorator(Theme.DARK)];
