import type { Meta, StoryObj } from "@storybook/react";
import { UiDatePicker } from ".";

const meta: Meta<typeof UiDatePicker> = {
    title: "DatePickers",
    component: UiDatePicker,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicDatePicker: Story = {
    args: {

    },
};
