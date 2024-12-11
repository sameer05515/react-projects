import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

const IconButton = () => {
  return (
    <div>
      <h1>Icon Button</h1>

      <p>
        <b>A Button Component That Accepts Text & An Icon</b>
      </p>

      <p>
        Full code (with example usage):{" "}
        <a href="https://github.com/academind/react-typescript-course-resources/blob/main/examples/IconButton.tsx">
          https://github.com/academind/react-typescript-course-resources/blob/main/examples/IconButton.tsx
        </a>
      </p>

      <p>
        A reusable IconButton component which will output text side-by-side next
        to a configurable icon (or actually any component). It accepts an icon
        prop which wants a component identifier as a value. <br />
        It may be used like this:
      </p>

      <pre>
        {`
<IconButton icon={HeartIcon} onClick={() => console.log('Button clicked!')}>
  Like
</IconButton>
        `}
      </pre>

      <h2>Example</h2>
      <Demo/>

    </div>
  );
};


// Example: A Button component that has an icon and text
// The icon is passed via a prop, which is a function that returns JSX code


type IconButtonProps = {
  icon: ElementType;
  onClick: () => void;
  children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

function IconButtonSample({
  // icon is aliased to Icon because it should be used like a custom component name
  icon: Icon,
  children,
  ...otherProps
}: IconButtonProps) {
  return (
    <button {...otherProps}>
      <span>
        <Icon />
      </span>
      <span>{children}</span>
    </button>
  );
}

// Example Usage:

function HeartIcon() {
  return <span>❤️</span>;
}

function Demo() {
  return (
    <IconButtonSample icon={HeartIcon} onClick={() => console.log('Button clicked!')}>
      Like
    </IconButtonSample>
  );
}

export default IconButton;
