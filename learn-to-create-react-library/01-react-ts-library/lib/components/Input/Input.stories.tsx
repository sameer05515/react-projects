import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./index";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Input label text",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    fullWidth: {
      control: "boolean",
      description: "Make input full width",
    },
    type: {
      control: "select",
      options: [
        "text",
        "email",
        "password",
        "number",
        "tel",
        "url",
        "search",
        "date",
        "time",
        "datetime-local",
      ],
      description: "Input type",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
    },
    required: {
      control: "boolean",
      description: "Mark input as required",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Enter text",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    type: "email",
    placeholder: "your@email.com",
  },
};

export const WithError: Story = {
  args: {
    label: "Password",
    type: "password",
    error: "Password must be at least 8 characters",
  },
};

export const FullWidth: Story = {
  args: {
    label: "Full Name",
    type: "text",
    fullWidth: true,
    placeholder: "Enter your full name",
  },
  parameters: {
    layout: "padded",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    type: "text",
    disabled: true,
    value: "This is disabled",
  },
};

export const Required: Story = {
  args: {
    label: "Required Field",
    type: "text",
    required: true,
    placeholder: "This field is required",
  },
};

export const DifferentTypes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "300px" }}>
      <Input label="Text" type="text" placeholder="Text input" />
      <Input label="Email" type="email" placeholder="email@example.com" />
      <Input label="Password" type="password" placeholder="Enter password" />
      <Input label="Number" type="number" placeholder="Enter number" />
      <Input label="Search" type="search" placeholder="Search..." />
    </div>
  ),
};

export const WithValidation: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "300px" }}>
      <Input
        label="Valid Email"
        type="email"
        placeholder="valid@email.com"
      />
      <Input
        label="Invalid Email"
        type="email"
        placeholder="invalid-email"
        error="Please enter a valid email address"
      />
    </div>
  ),
};

